import RouteProxy from "../../RouteProxy";
import HTTPUserRequest from "../../http/HTTPUserRequest";
import RouteResponse from "./RouteResponse";

/**
 * Route: /user/get
 */
class RouteGet extends RouteProxy {

	public async handle(request: HTTPUserRequest<unknown>) {
		try {

			request.sendJsonPayload<RouteResponse>({
				name: request.user.name,
				email: request.user.email,
				creationTimestamp: request.user.createdAt.getTime()
			})
		} catch (e) {
			this.logger.error(e);
			request.sendJsonError("Internal Server Error", 500);
		}
	}
}

export default RouteGet;