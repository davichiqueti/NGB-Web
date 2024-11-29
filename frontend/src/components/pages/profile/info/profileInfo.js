import Image from 'next/image';

export default function ProfileInfo({ user }) {
  return (
    <>
      <div id="info" className="relative">
        
        <div className="w-full h-48 relative">
          <Image
            src={user.banner_img || '/cover.jpg'}
            alt="Banner do Perfil"
            layout="fill"
            objectFit="cover"
            priority
          />
        </div>

        <div className="absolute top-32 left-4">
          {user.profile_img ? (
            <Image
              src={user.profile_img}
              alt="Foto de Perfil"
              width={100}
              height={100}
              className="rounded-full"
              priority
            />
          ) : (
            <div className="w-[100px] h-[100px] rounded-full flex items-center justify-center">
              <Image
                src="/defaultuser.png"
                alt="Foto de Perfil"
                width={100}
                height={100}
                className="rounded-full"
                priority
              />
            </div>
          )}
        </div>

        {/* Informações do Usuário */}
        <div className="mt-20 px-4">
          <h1 className="text-xl font-bold">{user.full_name}</h1>
          <p className="font-thin mb-4">@{user.username}</p>
          <p className="mb-4">Bio: {user.bio}</p>
        </div>
      </div>
    </>
  );
}
