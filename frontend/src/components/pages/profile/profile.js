
import Image from 'next/image';

export default function ProfileComponent({ user }) {
  return (
    <div>
      <h1>Bem-vindo, {user.full_name}!</h1>
      <p>Nome de usuário: {user.username}</p>
      <p>Email: {user.email}</p>
      <p>Bio: {user.bio}</p>
      {user.profile_img && (
        <Image src={user.profile_img} alt="Foto de Perfil" width={150} height={150} />
      )}
    </div>
  );
}
