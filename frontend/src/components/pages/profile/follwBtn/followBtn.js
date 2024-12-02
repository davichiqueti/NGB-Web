
import { toggleFollowUser } from '../../../../../services/userServices';

export default function FollowButton({id}){

    console.log(id)

    const handleFollow = async () => {
        try{
            await toggleFollowUser(id)
            console.log('click')

        } catch (error){
            console.error(error.message)
            
        }
    }

    return(
        <button 
            onClick={handleFollow} 
            className='bg-white text-black focus:bg-slate-500'
        >
            segir
      </button>
    )

}
