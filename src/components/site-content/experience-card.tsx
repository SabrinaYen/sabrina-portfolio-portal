import { BiField, DeleteButton, Field } from "../fields";
import { biProps, inputClass } from "../field-helpers";
import Selection from "../selection";
import type { Company, ExperienceItem } from "../../interfaces/global.types";

type Props = {
    item: ExperienceItem;
    companies: Company[];
    onChange: (changes: Partial<ExperienceItem>) => void;
    onDelete: () => void;
    refreshCompanies: () => Promise<void>;
};

function ExperienceCard({ item, companies, onChange, onDelete, refreshCompanies }: Props) {
    const bi = (key: string) => biProps(item, key, onChange);
    return (
        <div className="flex w-full flex-col gap-3 p-5">
            <BiField label="Role" {...bi("role")} />
            <div className="flex w-full items-end gap-3">
                <Field label="Company">
                    <Selection list={companies} value={item.company} isRefresh={refreshCompanies}
                        onChange={(company) => onChange({ company })} />
                </Field>
                <Field label="Period">
                    <input className={inputClass} type="text" placeholder="Oct 2024 — Present" value={item.period}
                        onChange={(e) => onChange({ period: e.target.value })} />
                </Field>
                <DeleteButton onClick={onDelete} />
            </div>
            <BiField label="What you did" multiline {...bi("description")}
                hint="One bullet per line. Keep the same order in both languages." />
        </div>
    );
}

export default ExperienceCard;
