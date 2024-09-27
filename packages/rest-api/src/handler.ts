import {

} from 'aws-lambda';
import {
    APIGatewayProxyEvent,
    APIGatewayProxyResult
} from 'aws-lambda/trigger/api-gateway-proxy.js';

export type Handler = (event: APIGatewayProxyEvent) => Promise<APIGatewayProxyResult>;

const getDogsHandler: Handler = async () => {
    return {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "*",
            "Access-Control-Allow-Headers": "*"
},
        body: JSON.stringify({message: 'Hello from the REST API'}),
    };
}

export const handler: Handler = async event => {
    if (event.httpMethod === 'GET' && event.path === '/dogs') {
        return getDogsHandler(event);
    }
    else {
        return {
            statusCode: 404,
            body: JSON.stringify({message: 'Not found'}),
        };
    }
}
