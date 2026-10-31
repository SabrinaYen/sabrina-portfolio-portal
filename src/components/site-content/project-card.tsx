import { BiField, DeleteButton, Field } from "../fields";
import { biProps, inputClass } from "../field-helpers";
import Selection from "../selection";
import type { Company, ProjectItem } from "../../interfaces/global.types";

type Props = {
    item: ProjectItem;
    companies: Company[];
    onChange: (changes: Partial<ProjectItem>) => void;
    onDelete: () => void;
    refreshCompanies: () => Promise<void>;
};

function ProjectCard({ item, companies, onChange, onDelete, refreshCompanies }: Props) {
    const bi = (key: string) => biProps(item, key, onChange);
    return (
        <div className="flex w-full flex-col gap-3 p-5">
            <BiField label="Project Name" {...bi("projectName")} />
            <BiField label="Project Type" {...bi("projectType")} hint="eg: E-commerce Experience" />
            <BiField label="Project Description" multiline {...bi("projectDesc")} />
            <div className="flex w-full justify-between gap-3">
                <Field label="Tech Stacks">
                    <input className={inputClass} type="text" placeholder="Comma separated (eg: React, FastAPI)"
                        value={item.techStack} onChange={(e) => onChange({ techStack: e.target.value })} />
                </Field>
                <Field label="URL">
                    <input className={inputClass} type="text" value={item.linkURL}
                        onChange={(e) => onChange({ linkURL: e.target.value })} />
                </Field>
            </div>
            <div className="flex w-full items-end justify-between gap-3">
                <Field label="Company Name">
                    <Selection list={companies} value={item.companyId} isRefresh={refreshCompanies}
                        onChange={(companyId) => onChange({ companyId })} />
                </Field>
                <Field label="Link is live">
                    <input className="h-4 w-4 accent-[#2563eb]" type="checkbox" checked={item.isAvailable}
                        onChange={(e) => onChange({ isAvailable: e.target.checked })} />
                </Field>
                <Field label="Show on site">
                    <input className="h-4 w-4 accent-[#2563eb]" type="checkbox" checked={item.projectShown}
                        title="Unchecked projects stay hidden unless the site is opened with ?showAll=true"
                        onChange={(e) => onChange({ projectShown: e.target.checked })} />
                </Field>
                <DeleteButton onClick={onDelete} />
            </div>
        </div>
    );
}

export default ProjectCard;
