
import Image from 'next/image';

export default function ProfileInfo({ user }) {
  return (
    <>
        <div id="info">
        {user.profile_img ? (
          <Image
            src={user.profile_img}
            alt="Foto de Perfil"
            width={100}
            height={100}
            className="rounded-full"
          />
        ) : (
          <div
            className="w-[100px] h-[100px] bg-gray-200 rounded-full flex items-center justify-center"
          >
            <span className="text-gray-500">Sem foto</span>
          </div>
        )}
        <h1 className="text-xl font-bold ">{user.full_name}</h1>
        <p>@{user.username}</p>
        <br></br>
        <p>Bio: {user.bio}</p>
        </div>

    </>
  );
}
