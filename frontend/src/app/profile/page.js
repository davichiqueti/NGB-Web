
import ProfileComponent from '@/components/pages/profile/profile';
import { getUserData } from '../../../services/userServices';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function ProfilePage() {
  
  const cookieStore = cookies();
  const jwt = cookieStore.get('jwt')?.value;

  if (!jwt) {
    redirect('/login');
  }

  try {
    const user = await getUserData(jwt);

    if (!user) {
      redirect('/login');
    }

    return (
      <div>
        <ProfileComponent user={user} />
      </div>
    );
  } catch (error) {
    console.error('Erro ao obter os dados do usuário:', error);
    redirect('/login');
  }
}
