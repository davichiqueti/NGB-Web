import { getOtherUserProfile } from '../../../../services/userServices';
import { redirect } from 'next/navigation';
import Profile from '@/components/pages/profile/profile.js';

export default async function UserProfilePage({ params }) {
  const { username } = await params;

  try {
    const userProfile = await getOtherUserProfile(username);

    if (!userProfile || !userProfile.user) {
        console.error('Perfil não encontrado ou resposta inválida:', userProfile);
        redirect('/404');
    }

    const userId = userProfile.user._id;


    return (
      <div>
        <Profile user={userProfile.user} isLogged={false} id={userId} />
      </div>
    );
  } catch (error) {
    console.error('Erro ao carregar o perfil do usuário: ', error);
    redirect('/500');
  }
}
