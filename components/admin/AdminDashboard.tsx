"use client";

import { useCallback, useMemo, useState } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import DashboardStats from "@/components/admin/DashboardStats";
import ReportReview from "@/components/admin/ReportReview";
import UsersTable from "@/components/admin/UsersTable";
import DashboardOverview from "@/components/admin/views/DashboardOverview";
import FollowUpsView from "@/components/admin/views/FollowUpsView";
import LeadsView from "@/components/admin/views/LeadsView";
import ReviewsView from "@/components/admin/views/ReviewsView";
import RevenueView from "@/components/admin/views/RevenueView";
import Notification from "@/components/ui/Notification";
import { mockUsers } from "@/lib/admin/mockUsers";
import type { AdminTab, AdminUser, ReportDraft } from "@/types/admin";

type Toast = {
  id: number;
  message: string;
};

const tabMeta: Record<AdminTab, { title: string; subtitle: string }> = {
  dashboard: {
    title: "Admin Dashboard",
    subtitle: "Overview of users, subscriptions, revenue, and reviews.",
  },
  users: {
    title: "Users",
    subtitle: "Review users and manage their plan access.",
  },
  leads: {
    title: "Leads (Free)",
    subtitle: "Free Skin Starter signups generated from the funnel.",
  },
  revenue: {
    title: "Revenue",
    subtitle: "Track collected, pending, and refunded payments.",
  },
  pending: {
    title: "Pending reviews",
    subtitle: "Reports awaiting your review and approval.",
  },
  completed: {
    title: "Completed",
    subtitle: "Reports you have approved and sent.",
  },
  followups: {
    title: "Follow-ups",
    subtitle: "Scheduled check-ins for active patients.",
  },
};

export default function AdminDashboard() {
  const [users, setUsers] = useState<AdminUser[]>(mockUsers);
  const [activeTab, setActiveTab] = useState<AdminTab>("dashboard");
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [toast, setToast] = useState<Toast | null>(null);

  const showToast = useCallback((message: string) => {
    setToast({ id: Date.now(), message });
  }, []);

  const handleTogglePlan = useCallback(
    (userId: string) => {
      setUsers((prev) =>
        prev.map((user) => {
          if (user.id !== userId) {
            return user;
          }
          const nextStatus =
            user.planStatus === "active" ? "disabled" : "active";
          showToast(
            nextStatus === "active"
              ? `Plan enabled for ${user.fullName}.`
              : `Plan disabled for ${user.fullName}.`,
          );
          return { ...user, planStatus: nextStatus };
        }),
      );
    },
    [showToast],
  );

  const handleSaveDraft = useCallback(
    (userId: string, draft: ReportDraft) => {
      setUsers((prev) =>
        prev.map((user) =>
          user.id === userId
            ? {
                ...user,
                report: draft,
                reportStatus:
                  user.reportStatus === "sent" ? "sent" : "in_review",
              }
            : user,
        ),
      );
      showToast("Draft saved.");
    },
    [showToast],
  );

  const handleApprove = useCallback(
    (userId: string, draft: ReportDraft) => {
      let email = "";
      setUsers((prev) =>
        prev.map((user) => {
          if (user.id !== userId) {
            return user;
          }
          email = user.email;
          return { ...user, report: draft, reportStatus: "sent" };
        }),
      );
      showToast(
        `Report approved. A "your report is ready" email has been sent to ${email}.`,
      );
      setSelectedUserId(null);
    },
    [showToast],
  );

  const handleMarkFollowUpDone = useCallback(
    (userId: string, followUpId: string) => {
      setUsers((prev) =>
        prev.map((user) =>
          user.id === userId
            ? {
                ...user,
                followUps: user.followUps.map((followUp) =>
                  followUp.id === followUpId
                    ? { ...followUp, status: "done" as const }
                    : followUp,
                ),
              }
            : user,
        ),
      );
      showToast("Follow-up marked as done.");
    },
    [showToast],
  );

  const handleMarkContacted = useCallback(
    (userId: string) => {
      setUsers((prev) =>
        prev.map((user) =>
          user.id === userId
            ? { ...user, leadStatus: "contacted" as const }
            : user,
        ),
      );
      showToast("Lead marked as contacted.");
    },
    [showToast],
  );

  const customers = useMemo(
    () => users.filter((user) => user.plan !== "starter"),
    [users],
  );
  const leads = useMemo(
    () => users.filter((user) => user.plan === "starter"),
    [users],
  );
  const pendingUsers = useMemo(
    () => customers.filter((user) => user.reportStatus !== "sent"),
    [customers],
  );
  const completedUsers = useMemo(
    () => customers.filter((user) => user.reportStatus === "sent"),
    [customers],
  );
  const openFollowUps = useMemo(
    () =>
      users.reduce(
        (count, user) =>
          count + user.followUps.filter((f) => f.status !== "done").length,
        0,
      ),
    [users],
  );
  const newLeads = useMemo(
    () => leads.filter((lead) => (lead.leadStatus ?? "new") === "new").length,
    [leads],
  );

  const counts: Record<AdminTab, number> = {
    dashboard: 0,
    users: customers.length,
    leads: newLeads,
    revenue: 0,
    pending: pendingUsers.length,
    completed: completedUsers.length,
    followups: openFollowUps,
  };

  const selectedUser = users.find((user) => user.id === selectedUserId) ?? null;
  const meta = tabMeta[activeTab];

  const handleSelectTab = (tab: AdminTab) => {
    setSelectedUserId(null);
    setActiveTab(tab);
  };

  return (
    <>
      <div className="flex min-h-[100dvh] flex-col lg:flex-row">
        <AdminSidebar
          activeTab={activeTab}
          onSelect={handleSelectTab}
          counts={counts}
        />

        <main className="min-w-0 flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          {selectedUser ? (
            <ReportReview
              user={selectedUser}
              onBack={() => setSelectedUserId(null)}
              onSaveDraft={handleSaveDraft}
              onApprove={handleApprove}
            />
          ) : (
            <>
              <div>
                <h1 className="font-serif text-2xl text-brand-primary sm:text-3xl">
                  {meta.title}
                </h1>
                <p className="mt-1 text-sm text-brand-gray">{meta.subtitle}</p>
              </div>

              <div className="mt-6">
                {activeTab === "dashboard" ? (
                  <DashboardOverview users={users} />
                ) : null}

                {activeTab === "users" ? (
                  <>
                    <DashboardStats users={customers} />
                    <div className="mt-6 rounded-3xl border border-brand-lavender/50 bg-white p-4 shadow-sm sm:p-6">
                      <UsersTable
                        users={customers}
                        onTogglePlan={handleTogglePlan}
                        onReview={(userId) => setSelectedUserId(userId)}
                      />
                    </div>
                  </>
                ) : null}

                {activeTab === "leads" ? (
                  <LeadsView
                    leads={leads}
                    onMarkContacted={handleMarkContacted}
                    onViewReport={(userId) => setSelectedUserId(userId)}
                  />
                ) : null}

                {activeTab === "revenue" ? <RevenueView users={users} /> : null}

                {activeTab === "pending" ? (
                  <ReviewsView
                    users={pendingUsers}
                    mode="pending"
                    onReview={(userId) => setSelectedUserId(userId)}
                  />
                ) : null}

                {activeTab === "completed" ? (
                  <ReviewsView
                    users={completedUsers}
                    mode="completed"
                    onReview={(userId) => setSelectedUserId(userId)}
                  />
                ) : null}

                {activeTab === "followups" ? (
                  <FollowUpsView
                    users={users}
                    onMarkDone={handleMarkFollowUpDone}
                  />
                ) : null}
              </div>
            </>
          )}
        </main>
      </div>

      <Notification
        key={toast?.id}
        isOpen={Boolean(toast)}
        message={toast?.message ?? ""}
        onDismiss={() => setToast(null)}
        variant="success"
      />
    </>
  );
}
