import { useParams } from 'react-router';
import './ExamplePage.style';

export const ExamplePage = () => {
    const { id } = useParams();

    if (!id?.match(/\d/)) {
        throw Error('ID is not a number!');
    }

    return (
        <main block="ExamplePage">
            <div elem="MainContent">
                <h1 elem="Header">
                    Your identifier is
                </h1>
                <h2 elem="Subheader">
                    {id}!
                </h2>
            </div>
        </main>
    );
};

export default ExamplePage;