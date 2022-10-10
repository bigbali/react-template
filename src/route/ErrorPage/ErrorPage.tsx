import './ErrorPage.style';

export const ErrorPage = () => {
    return (
        <main block="NotFoundPage">
            <div elem="MainContent">
                <h1 elem="Header">
                    There's a fly in the soup
                </h1>
                <h2 elem="Subheader">
                    Something's not right. It looks like we've caught an error!
                </h2>
            </div>
        </main>
    );
};

export default ErrorPage;