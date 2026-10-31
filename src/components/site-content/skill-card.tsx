import { BiField, DeleteButton, Field } from "../fields";
import { biProps, inputClass } from "../field-helpers";
import type { GroupItem } from "../../interfaces/global.types";

const icons = [
    { value: "code", label: "Code  _>" },
    { value: "database", label: "Database" },
    { value: "cloud", label: "Cloud" },
    { value: "checked", label: "Check mark" },
];

type Props = {
    item: GroupItem;
    onChange: (changes: Partial<GroupItem>) => void;
    onDelete: () => void;
};

function SkillCard({ item, onChange, onDelete }: Props) {
    return (
        <div className="flex w-full flex-col gap-3 p-5">
            <BiField label="Group" {...biProps(item, "groupTitle", onChange)} />
            <div className="flex w-full items-end gap-3">
                <Field label="Skills">
                    <input className={inputClass} type="text" placeholder="Comma separated (eg: HTML, CSS, Figma)"
                        value={item.groupDesc} onChange={(e) => onChange({ groupDesc: e.target.value })} />
                </Field>
                <Field label="Icon">
                    <select className={inputClass} value={item.groupIcon}
                        onChange={(e) => onChange({ groupIcon: e.target.value })}>
                        {icons.map((icon) => <option key={icon.value} value={icon.value}>{icon.label}</option>)}
                    </select>
                </Field>
                <DeleteButton onClick={onDelete} />
            </div>
        </div>
    );
}

export default SkillCard;
