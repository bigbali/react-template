import './AboutPage.style.scss';

export const AboutPage = () => {
    return (
        // eslint-disable-next-line max-len
        <main block="AboutPage" style={{ backgroundImage: 'url(https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg)' }}>
            <div elem="MainContent">
                <h1 elem="Header">
                    about
                </h1>
                <h2 elem="Subheader">
                    ...about what?
                </h2>
                <p>
                    Welcome to the "about" page.
                </p>
            </div>
        </main>
    );
};

export default AboutPage;