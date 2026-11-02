import { useEffect, useState } from "react";
import { api, API_URL } from "../api";
import { errorMessage } from "../api/content";
import { useAuth } from "../auth/auth-provider";
import LoadingScreen from "../components/loading";
import type { ActivityLog, VisitStats } from "../interfaces/global.types";

function StatCard({ label, value }: { label: string; value: number }) {
    return (
        <div className="flex-1 rounded-lg border border-[#e2e8f2] bg-white p-5">
            <div className="text-[11px] font-semibold uppercase tracking-wide text-[#5a6b87]">{label}</div>
            <div className="text-[27px] font-bold text-[#1b2b47]">{value}</div>
        </div>
    );
}

// colour of the dot in front of each log line
const dotColor = (action: string) => {
    if (action.startsWith("delete")) return "bg-[#dc2626]";
    if (action.startsWith("add")) return "bg-[#16a34a]";
    if (action.startsWith("change")) return "bg-[#f59e0b]";
    return "bg-[#2563eb]";
};

// pick a short readable detail from the log, e.g. a project name
const detailText = (details: ActivityLog["details"]) => {
    const value = details?.name ?? details?.role ?? details?.group ?? details?.label ?? details?.paramType;
    return value ? String(value) : "";
};

// "save-param" -> "Save param"
const actionLabel = (action: string) => {
    const text = action.replace(/-/g, " ");
    return text.charAt(0).toUpperCase() + text.slice(1);
};

function Dashboard() {
    const { user } = useAuth();
    const [stats, setStats] = useState<VisitStats | null>(null);
    const [logs, setLogs] = useState<ActivityLog[]>([]);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!user) return;
        Promise.all([
            api.get(API_URL.VisitStats),
            api.post(API_URL.ActivityLogs, { username: user.username }),
        ])
            .then(([statsResult, logsResult]) => {
                setStats(statsResult.data);
                setLogs(logsResult.data);
            })
            .catch((e) => setError(errorMessage(e)));
    }, [user]);

    if (!stats && !error) return <LoadingScreen label="Loading your dashboard..." />;

    const busiestDay = Math.max(1, ...(stats?.last7.map((day) => day.count) ?? []));

    return (
        <div className="min-h-screen bg-[#f4f6fb] p-[26px]">
            <h1 className="text-[27px] font-bold">Dashboard</h1>
            <h2 className="text-[13.5px] text-[#5a6b87]">Visitors to your portfolio and your recent changes.</h2>
            {error && <p className="mt-3 text-[13px] text-[#dc2626]">{error}</p>}

            <div className="my-5 flex gap-3">
                <StatCard label="Total visits" value={stats?.total ?? 0} />
                <StatCard label="Today" value={stats?.today ?? 0} />
                <StatCard label="Last 7 days" value={stats?.last7.reduce((sum, day) => sum + day.count, 0) ?? 0} />
            </div>

            <div className="my-5 rounded-lg border border-[#e2e8f2] bg-white">
                <div className="border-b border-b-[#e2e8f2] p-3 text-[13px] font-medium text-[#1b2b47]">Visits per day</div>
                <div className="flex h-[140px] items-end gap-3 p-5">
                    {stats?.last7.map((day) => (
                        <div key={day.date} className="flex flex-1 flex-col items-center justify-end gap-1">
                            <span className="text-[11px] text-[#5a6b87]">{day.count}</span>
                            <div className="w-full rounded-sm bg-[#2563eb]" style={{ height: `${(day.count / busiestDay) * 80}px`, minHeight: 2 }} />
                            <span className="text-[11px] text-[#5a6b87]">{day.date.slice(5)}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="my-5 rounded-lg border border-[#e2e8f2] bg-white">
                <div className="border-b border-b-[#e2e8f2] p-3 text-[13px] font-medium text-[#1b2b47]">Activity log</div>
                {logs.length === 0 && <p className="p-5 text-[13px] text-[#5a6b87]">No activity yet.</p>}
                {logs.map((log, index) => (
                    <div key={index} className="flex items-center gap-3 border-b border-b-[#e2e8f2] px-5 py-3 text-[13px] last:border-b-0">
                        <span className={`h-2 w-2 shrink-0 rounded-full ${dotColor(log.action)}`} />
                        <span className="font-medium text-[#1b2b47]">{actionLabel(log.action)}</span>
                        <span className="truncate text-[#5a6b87]">{detailText(log.details)}</span>
                        <span className="ml-auto shrink-0 text-[12px] text-[#94a3b8]">{new Date(log.created_at).toLocaleString()}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Dashboard;
