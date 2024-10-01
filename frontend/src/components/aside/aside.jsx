import styles from './aside.module.css'


export default function Aside() {

    return(
        <>

            <aside className={styles.aside}>
                <h1>Aside</h1>
                <br />
                <p>Explore</p>
                <p>Notifications</p>
                <p>Messages</p>
                <p>Profile</p>
                <p>More</p>
            </aside>
        
        </>
    )
};