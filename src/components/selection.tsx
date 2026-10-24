import { useId, useState, type FocusEvent, type KeyboardEvent } from "react";
import { api, API_URL } from "../api";

export type SelectionOption = string | number | {
    label?: string;
    value?: string | number;
    name?: string;
    companyName?: string;
    id?: string | number;
    companyId?: string | number;
};

type SelectionProps = {
    className?: string;
    list?: SelectionOption[];
    value?: string;
    placeholder?: string;
    onChange?: (value: string) => void;
    isRefresh?: () => Promise<void>;
};

const getOptionLabel = (option: SelectionOption) => {
    if (typeof option !== "object") return String(option);
    return String(option.label ?? option.name ?? option.companyName ?? option.value ?? "");
};

const getOptionValue = (option: SelectionOption) => {
    if (typeof option !== "object") return String(option);
    return String(option.value ?? option.id ?? option.companyId ?? option.companyName ?? option.name ?? option.label ?? "");
};

const Selection = ({
    list = [],
    className = "",
    value = "",
    placeholder = "Select company",
    onChange,
    isRefresh = async () => undefined,
}: SelectionProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState("");
    const listboxId = useId();
    const selectedOption = list.find((option) => getOptionValue(option) === value);
    const selectedLabel = selectedOption ? getOptionLabel(selectedOption) : value;
    const filteredOptions = list.filter((option) =>
        getOptionLabel(option).toLowerCase().includes(query.trim().toLowerCase())
    );

    const handleBlur = (event: FocusEvent<HTMLDivElement>) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
            setIsOpen(false);
            setQuery("");
        }
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Escape") {
            setIsOpen(false);
            setQuery("");
        } else if (event.key === "Enter" && isOpen && filteredOptions[0]) {
            event.preventDefault();
            selectOption(filteredOptions[0]);
        }
    };

    const handleAdd = async () => {
        const result = await api.post(API_URL.AddCompany, { companyName: query });
        if (result.status === 200) {
            await isRefresh();
        }
    };
    const handleDelete = async (queryId:number,queryName:string) => {
        const result = await api.post(API_URL.DeleteCompany, { id: queryId , name: queryName });
        if (result.status === 200) {
            await isRefresh();
        }
    };

    const selectOption = (option: SelectionOption) => {
        onChange?.(getOptionValue(option));
        setQuery("");
        setIsOpen(false);
    };

    return (
        <div className="relative w-full" onBlur={handleBlur}>
            <input
                type="text"
                role="combobox"
                aria-autocomplete="list"
                aria-expanded={isOpen}
                aria-controls={listboxId}
                className={`w-full rounded-lg border border-[#e2e8f2] bg-white px-3 py-2 text-[13px] text-[#1b2b47] outline-none transition placeholder:text-[#94a3b8] focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/15 ${className}`}
                placeholder={placeholder}
                value={isOpen ? query : selectedLabel}
                onFocus={handleBlur}
                onChange={(event) => {
                    setQuery(event.target.value);
                    setIsOpen(true);
                }}
                onKeyDown={handleKeyDown}
            />
            {isOpen && (
                <div
                    id={listboxId}
                    role="listbox"
                    className="absolute z-20 mt-1 max-h-56 w-full overflow-y-auto rounded-lg border border-[#e2e8f2] bg-white py-1 shadow-lg"
                >
                    {filteredOptions.length > 0 ? filteredOptions.map((option) => {
                        const optionValue = getOptionValue(option);
                        const optionLabel = getOptionLabel(option);
                        return (
                            <div className={`flex flex-row px-5 hover:bg-[#f4f6fb] transition focus:bg-[#f4f6fb] focus:outline-none ${optionValue === value ? "bg-[#eff6ff] font-medium text-[#2563eb]" : "text-[#1b2b47]"}`}>
                                <div
                                    key={optionValue}
                                    aria-selected={optionValue === value}
                                    className={`w-full p-2 text-[13px] `}
                                    onMouseDown={(event) => event.preventDefault()}
                                    onClick={() => selectOption(option)}
                                >
                                    {optionLabel}
                                </div>
                                <button className="text-xs" onClick={ () => handleDelete(Number(optionValue),optionLabel)}>X</button>
                            </div>
                        );
                    }) : (
                        <button className="px-3 py-2 text-[13px] text-[#5a6b87]" disabled={!query} onClick={() => handleAdd()}>
                            {list.length === 0 && query === "" ? "No companies available" : `+ Create ${query}`}
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

export default Selection;
