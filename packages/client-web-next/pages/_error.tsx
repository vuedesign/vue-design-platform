type ErrorProps = {
    statusCode: number;
};

function Error({ statusCode }: ErrorProps) {
    return (
        <p>
            {statusCode
                ? `An error ${statusCode} occurred on server`
                : 'An error occurred on client'}
        </p>
    );
}

type InitialProps = {
    res: {
        statusCode: number;
    };
    err: {
        statusCode: number;
    };
};

Error.getInitialProps = ({ res, err }: InitialProps) => {
    console.log('err', err);
    // console.log('res', res);
    const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
    return { statusCode };
};

export default Error;
