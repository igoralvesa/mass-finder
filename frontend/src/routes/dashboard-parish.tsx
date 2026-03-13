import { useState } from 'react';
import { createFileRoute, redirect } from '@tanstack/react-router';
import { Info, Calendar, Clock } from 'lucide-react';
import { DashboardHeader } from '@/components/dashboard/dashboard-header';
import {
  SidebarLayout,
  type SidebarItem,
} from '@/components/admin/sidebar-layout';
import { ParishInfoForm } from '@/components/parish/parish-info-form';
import { MassScheduleTable } from '@/components/parish/mass-schedule-table';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  useParishProfile,
  useUpdateParishProfile,
  useParishMassSchedules,
  useCreateParishMassSchedule,
  useUpdateParishMassSchedule,
  useDeleteParishMassSchedule,
} from '@/hooks';
import { getAccessToken } from '@/utils/token-storage';
import { HttpError } from '@/types/api';

export const Route = createFileRoute('/dashboard-parish')({
  beforeLoad: () => {
    if (!getAccessToken()) {
      throw redirect({ to: '/login' });
    }
  },
  component: DashboardParishPage,
});

const sidebarItems: SidebarItem[] = [
  { id: 'info', label: 'Informações da Paróquia', icon: Info },
  { id: 'schedule', label: 'Horários de Missas', icon: Calendar },
];

function DashboardParishPage() {
  const [activeView, setActiveView] = useState('info');

  const profileQuery = useParishProfile();
  const updateProfile = useUpdateParishProfile();

  const schedulesQuery = useParishMassSchedules();
  const createSchedule = useCreateParishMassSchedule();
  const updateSchedule = useUpdateParishMassSchedule();
  const deleteSchedule = useDeleteParishMassSchedule();

  const isForbidden =
    profileQuery.error instanceof HttpError &&
    profileQuery.error.status === 403;

  const parish = profileQuery.data?.data;
  const schedules = schedulesQuery.data?.data ?? [];

  if (isForbidden) {
    return (
      <div className='min-h-screen bg-background'>
        <DashboardHeader title='Mass Finder' role='parish' />
        <div className='flex items-center justify-center min-h-[calc(100vh-73px)] p-4'>
          <Card className='max-w-md w-full text-center'>
            <CardHeader>
              <div className='mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900/30'>
                <Clock className='h-6 w-6 text-amber-600 dark:text-amber-400' />
              </div>
              <CardTitle>Aguardando Aprovação</CardTitle>
              <CardDescription>
                Sua paróquia foi cadastrada com sucesso e está aguardando a
                aprovação do administrador. Você será notificado quando o acesso
                for liberado.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className='text-xs text-muted-foreground'>
                Enquanto isso, você pode sair e voltar mais tarde para verificar
                o status.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-background'>
      <DashboardHeader title='Mass Finder' role='parish' />
      <SidebarLayout
        items={sidebarItems}
        activeItem={activeView}
        onItemClick={setActiveView}
      >
        <div className='p-8 bg-linear-to-br from-background to-accent/5 min-h-full'>
          <div className='container mx-auto'>
            {activeView === 'info' && (
              <ParishInfoForm
                parish={parish}
                isLoading={profileQuery.isLoading}
                isError={profileQuery.isError}
                onSave={(data) => updateProfile.mutate(data)}
                isSaving={updateProfile.isPending}
                saveSuccess={updateProfile.isSuccess}
                saveError={updateProfile.error}
              />
            )}
            {activeView === 'schedule' && (
              <MassScheduleTable
                schedules={schedules}
                isLoading={schedulesQuery.isLoading}
                isError={schedulesQuery.isError}
                onCreate={(data) => createSchedule.mutate(data)}
                onUpdate={(id, body) => updateSchedule.mutate({ id, body })}
                onDelete={(id) => deleteSchedule.mutate(id)}
                isCreating={createSchedule.isPending}
                isUpdating={updateSchedule.isPending}
                isDeleting={deleteSchedule.isPending}
                deletingId={
                  deleteSchedule.isPending
                    ? (deleteSchedule.variables as number)
                    : null
                }
              />
            )}
          </div>
        </div>
      </SidebarLayout>
    </div>
  );
}
