import axios from "axios";
import { api, API_URL } from ".";
import type { Company, ExperienceItem, LinkItem, ProjectItem, SiteData, TerminalLine } from "../interfaces/global.types";

export const getCompanies = async (): Promise<Company[]> => {
    const result = await api.get(API_URL.GetCompanyList);
    return Array.isArray(result.data) ? result.data : [];
};

// Turn an axios error into a message we can show on screen.
export const errorMessage = (error: unknown) => {
    if (axios.isAxiosError(error)) {
        if (!error.response) return "Can't reach the server. If it was idle, wait a minute and try again.";
        return error.response.data?.detail ?? error.message;
    }
    return error instanceof Error ? error.message : "Something went wrong";
};

// ---------- load ----------

// terminal lines are saved as one JSON text in the "site" params
const parseTerminalLines = (json?: string): TerminalLine[] => {
    try {
        return json ? JSON.parse(json) : [];
    } catch {
        return [];
    }
};

export async function loadSiteData(): Promise<SiteData> {
    const [params, site, companies, projects, experience, skills, links] = await Promise.all([
        api.post(API_URL.GetParam, { paramType: "contents" }),
        api.post(API_URL.GetParam, { paramType: "site" }),
        getCompanies(),
        api.get(API_URL.Project.list),
        api.get(API_URL.Experience.list),
        api.get(API_URL.Skill.list),
        api.get(API_URL.LinkList),
    ]);

    const companyIdByName = (name: string) =>
        String(companies.find((company) => company.name === name)?.id ?? "");

    return {
        content: params.data,
        terminalLines: parseTerminalLines(site.data.terminalLines),
        companies,
        links: links.data,
        skills: skills.data,
        // the form picks a company by id; the server stores the name
        experience: experience.data.map((item: ExperienceItem) => ({
            ...item,
            company: companyIdByName(item.company),
        })),
        projects: projects.data.map((item: ProjectItem & { companyId: number | null }) => ({
            ...item,
            companyId: item.companyId ? String(item.companyId) : "",
        })),
    };
}

// ---------- save ----------

type Endpoints = { list: string; add: string; update: string; remove: string };

// Makes the server list match `items`: delete what was removed,
// update items that have an id, add items that don't.
async function syncList<T extends { id?: number }>(
    endpoints: Endpoints,
    items: T[],
    toPayload: (item: T, index: number) => object,
) {
    const saved: { id: number }[] = (await api.get(endpoints.list)).data;
    const keptIds = items.map((item) => item.id);

    for (const old of saved) {
        if (!keptIds.includes(old.id)) await api.post(endpoints.remove, { id: old.id });
    }
    for (const [index, item] of items.entries()) {
        const payload = { ...toPayload(item, index), sortOrder: index + 1 };
        if (item.id) await api.post(endpoints.update, { id: item.id, ...payload });
        else await api.post(endpoints.add, payload);
    }
}

async function syncLinks(links: LinkItem[]) {
    const wanted = links.filter((link) => link.label.trim() && link.url.trim());
    const saved: LinkItem[] = (await api.get(API_URL.LinkList)).data;

    for (const old of saved) {
        if (!wanted.some((link) => link.label === old.label)) {
            await api.post(API_URL.DeleteLink, { label: old.label });
        }
    }
    for (const link of wanted) await api.post(API_URL.AddLink, link);
}

export async function saveSiteData(data: SiteData) {
    const companyName = (id: string) => data.companies.find((c) => String(c.id) === id)?.name ?? "";

    for (const role of data.experience) {
        if (!companyName(role.company)) throw new Error(`Pick a company for the role "${role.role || "(no title)"}"`);
    }

    await api.post(API_URL.SaveParam, { paramType: "contents", values: data.content });
    const terminalLines = data.terminalLines.filter((line) => line.command.trim());
    await api.post(API_URL.SaveParam, {
        paramType: "site",
        values: { terminalLines: JSON.stringify(terminalLines) },
    });

    await syncList(API_URL.Project, data.projects, (item) => ({
        ...item, // same field names as the API, except these two
        project_name: item.projectName,
        company_Id: Number(item.companyId) || null,
    }));

    await syncList(API_URL.Experience, data.experience, (item) => ({
        ...item,
        company: companyName(item.company), // the API stores the company name
    }));

    await syncList(API_URL.Skill, data.skills, (item) => item);

    await syncLinks(data.links);
}
