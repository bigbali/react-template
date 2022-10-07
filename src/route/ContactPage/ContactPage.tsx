import './ContactPage.style.scss';

export const ContactPage = () => {
    return (
        <main block="ContactPage" style={{ backgroundImage: 'url(https://tinypng.com/images/social/website.jpg)' }}>
            <div elem="MainContent">
                <h1 elem="Header">
                    contact
                </h1>
                <h2 elem="Subheader">
                    feel free to look me up at
                </h2>
                <ul elem="List">
                    <li>
                        facebook
                    </li>
                    <li>
                        linkedin
                    </li>
                    <li>
                        github
                    </li>
                </ul>
            </div>
        </main>
    );
};

export default ContactPage;