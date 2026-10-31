import { DeleteButton } from "../fields";
import { inputClass } from "../field-helpers";
import type { LinkItem } from "../../interfaces/global.types";

type Props = {
    item: LinkItem;
    onChange: (changes: Partial<LinkItem>) => void;
    onDelete: () => void;
};

function LinkRow({ item, onChange, onDelete }: Props) {
    return (
        <div className="flex w-full items-start gap-3 px-5 pt-5">
            <input className={`w-[200px] ${inputClass}`} type="text" placeholder="Label (eg: GitHub)" value={item.label}
                onChange={(e) => onChange({ label: e.target.value })} />
            <input className={`w-full ${inputClass}`} type="text" placeholder="https://" value={item.url}
                onChange={(e) => onChange({ url: e.target.value })} />
            <DeleteButton onClick={onDelete} />
        </div>
    );
}

export default LinkRow;
