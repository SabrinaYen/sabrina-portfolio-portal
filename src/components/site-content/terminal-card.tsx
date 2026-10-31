import { DeleteButton, Field } from "../fields";
import { inputClass } from "../field-helpers";
import type { TerminalLine } from "../../interfaces/global.types";

type Props = {
    item: TerminalLine;
    onChange: (changes: Partial<TerminalLine>) => void;
    onDelete: () => void;
};

// One line of the terminal box on the site: a command and what it prints.
function TerminalCard({ item, onChange, onDelete }: Props) {
    return (
        <div className="flex w-full items-end gap-3 p-5">
            <Field label="Command">
                <input className={inputClass} type="text" placeholder="sabrina --stack" value={item.command}
                    onChange={(e) => onChange({ command: e.target.value })} />
            </Field>
            <Field label="Output (English)">
                <input className={inputClass} type="text" value={item.en}
                    onChange={(e) => onChange({ en: e.target.value })} />
            </Field>
            <Field label="Output (中文)">
                <input className={inputClass} type="text" value={item.zh}
                    onChange={(e) => onChange({ zh: e.target.value })} />
            </Field>
            <DeleteButton onClick={onDelete} />
        </div>
    );
}

export default TerminalCard;
