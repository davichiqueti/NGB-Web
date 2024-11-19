import ProfileInfo from '@/components/pages/profile/info/profileInfo';
import LogoutButton from '@/components/pages/profile/logoutBtn/logoutbtn';


export default function Profile({user}){
    return(
        <>
            <ProfileInfo user={user} />
            <LogoutButton />
        </>
    )
}