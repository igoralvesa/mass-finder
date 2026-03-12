import { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { Users, FileText } from 'lucide-react';
import { DashboardHeader } from '@/components/dashboard/dashboard-header';
import {
  SidebarLayout,
  type SidebarItem,
} from '@/components/admin/sidebar-layout';
import { ParishesTable } from '@/components/admin/parishes-table';
import { PendingRequestsTable } from '@/components/admin/pending-requests-table';
import {
  useAdminParishes,
  useApproveParish,
  useRejectParish,
  useDeleteAdminParish,
} from '@/hooks';

export const Route = createFileRoute('/dashboard-admin')({
  component: DashboardAdminPage,
});

const sidebarItems: SidebarItem[] = [
  { id: 'parishes', label: 'Gerenciar Paróquias', icon: Users },
  { id: 'requests', label: 'Solicitações Pendentes', icon: FileText },
];

function DashboardAdminPage() {
  const [activeView, setActiveView] = useState('parishes');

  const { data, isLoading, isError } = useAdminParishes();
  const approveMutation = useApproveParish();
  const rejectMutation = useRejectParish();
  const deleteMutation = useDeleteAdminParish();

  const parishes = data?.data ?? [];

  function handleApprove(id: number) {
    approveMutation.mutate(id);
  }

  function handleReject(id: number, reason: string) {
    rejectMutation.mutate({ id, body: { rejection_reason: reason } });
  }

  function handleDelete(id: number) {
    deleteMutation.mutate(id);
  }

  return (
    <div className='min-h-screen bg-background'>
      <DashboardHeader title='Mass Finder' role='admin' />
      <SidebarLayout
        items={sidebarItems}
        activeItem={activeView}
        onItemClick={setActiveView}
      >
        <div className='p-8 bg-linear-to-br from-background to-secondary/5 min-h-full'>
          <div className='container mx-auto'>
            {activeView === 'parishes' && (
              <ParishesTable
                parishes={parishes}
                isLoading={isLoading}
                isError={isError}
                onDelete={handleDelete}
                deletingId={
                  deleteMutation.isPending
                    ? (deleteMutation.variables as number)
                    : null
                }
              />
            )}
            {activeView === 'requests' && (
              <PendingRequestsTable
                parishes={parishes}
                isLoading={isLoading}
                isError={isError}
                onApprove={handleApprove}
                onReject={handleReject}
                approvingId={
                  approveMutation.isPending
                    ? (approveMutation.variables as number)
                    : null
                }
                isRejecting={rejectMutation.isPending}
              />
            )}
          </div>
        </div>
      </SidebarLayout>
    </div>
  );
}
