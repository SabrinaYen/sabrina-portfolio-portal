import { useEffect, useState } from "react";
import { api, API_URL } from "../api";
import { errorMessage, getCompanies } from "../api/content";
import { useAuth } from "../auth/auth-provider";
import LoadingScreen from "../components/loading";
import ManageList from "../components/manage-list";
import type { Company } from "../interfaces/global.types";

const inputClass = "rounded-lg border border-[#e2e8f2] p-2 text-[#1b2b47]";

function Card({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <div className="my-5 flex w-full flex-col rounded-lg border border-[#e2e8f2] bg-white">
            <div className="border-b border-b-[#e2e8f2] p-3 text-[13px] font-medium text-[#1b2b47]">{title}</div>
            {children}
        </div>
    );
}

function Setting() {
    const { user } = useAuth();
    const [companies, setCompanies] = useState<Company[]>([]);
    const [purposes, setPurposes] = useState<Company[]>([]);
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [message, setMessage] = useState("");
    const [isLoaded, setIsLoaded] = useState(false);

    const loadLists = async () => {
        try {
            setCompanies(await getCompanies());
            setPurposes((await api.get(API_URL.GetPurposeList)).data);
        } finally {
            setIsLoaded(true);
        }
    };

    // run an action, then reload the lists; show any server error
    const run = async (action: () => Promise<unknown>) => {
        try {
            await action();
            setMessage("");
            await loadLists();
        } catch (error) {
            setMessage(errorMessage(error));
        }
    };

    const changePassword = async () => {
        try {
            await api.post(API_URL.ChangePassword, { currentPassword, newPassword });
            setCurrentPassword("");
            setNewPassword("");
            setMessage("Password changed");
        } catch (error) {
            setMessage(errorMessage(error));
        }
    };

    useEffect(() => {
        loadLists().catch((error) => setMessage(errorMessage(error)));
    }, []);

    if (!isLoaded) return <LoadingScreen label="Loading settings..." />;

    return (
        <div className="min-h-screen bg-[#f4f6fb] p-[26px]">
            <h1 className="text-[27px] font-bold">Settings</h1>
            <h2 className="text-[13.5px] text-[#5a6b87]">Your account and the lists used by the content page.</h2>
            {message && <p className="mt-3 text-[13px] text-[#5a6b87]">{message}</p>}

            <Card title="Account">
                <div className="flex flex-col gap-3 p-5">
                    <div className="text-[13px] text-[#5a6b87]">Signed in as <b className="text-[#1b2b47]">{user?.username}</b></div>
                    <input className={inputClass} type="password" placeholder="Current password" value={currentPassword}
                        onChange={(event) => setCurrentPassword(event.target.value)} />
                    <input className={inputClass} type="password" placeholder="New password (at least 8 characters)" value={newPassword}
                        onChange={(event) => setNewPassword(event.target.value)} />
                    <button type="button" disabled={!currentPassword || !newPassword}
                        className="w-fit rounded-lg bg-[#2563eb] px-[16px] py-[9px] text-[13px] text-white disabled:opacity-60"
                        onClick={changePassword}>
                        Change password
                    </button>
                </div>
            </Card>

            <Card title="Companies">
                <ManageList items={companies} placeholder="New company"
                    onAdd={(name) => run(() => api.post(API_URL.AddCompany, { companyName: name }))}
                    onDelete={(item) => run(() => api.post(API_URL.DeleteCompany, { id: item.id, name: item.name }))} />
            </Card>

            <Card title="Project purposes">
                <ManageList items={purposes} placeholder="New purpose"
                    onAdd={(name) => run(() => api.post(API_URL.AddPurpose, { purposeName: name }))}
                    onDelete={(item) => run(() => api.post(API_URL.DeletePurpose, { id: item.id, name: item.name }))} />
            </Card>
        </div>
    );
}

export default Setting;
