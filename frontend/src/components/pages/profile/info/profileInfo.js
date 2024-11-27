
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
            priority 
          />
        ) : (
          <div
            className="w-[100px] h-[100px] rounded-full flex items-center justify-center"
          >
            <Image 
              src={'/defaultuser.png'}
              alt="Foto de Perfil"
              width={100}
              height={100}
              className="rounded-full"
              priority 
            />
          </div>
        )}
        
        <h1 className="text-xl font-bold ">{user.full_name}</h1>
        <p className='font-thin mb-4'>@{user.username}</p>
        
        <p className="mb-4">Bio: {user.bio}</p>
        </div>

    </>
  );
}
