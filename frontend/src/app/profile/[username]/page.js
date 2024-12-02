import { getOtherUserProfile } from '../../../../services/userServices';
import { redirect } from 'next/navigation';
import Profile from '@/components/pages/profile/profile.js';

export default async function UserProfilePage({ params }) {
  const { username } = await params;

  try {
    
    const userProfile = await getOtherUserProfile(username);
    console.log('Resposta da API:', userProfile);

    if (!userProfile || !userProfile.user) {
        console.error('Perfil não encontrado ou resposta inválida:', userProfile);
        redirect('/404');
    }

    return (
      <div>
        <Profile user={userProfile.user} />
        <div className="px-4 mt-4">
          {userProfile.is_following ? (
            <button className="btn btn-danger">Unfollow</button>
          ) : (
            <button className="btn btn-primary">Follow</button>
          )}
        </div>
      </div>
    );
  } catch (error) {
    console.error('Erro ao carregar o perfil do usuário: ', error);
    redirect('/500');
  }
}
