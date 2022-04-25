export class AppMenuItem {
    name = '';
    permissionName = '';
    icon = '';
    route = '';
    routeErps = [];
    items: AppMenuItem[];
    external: boolean;
    requiresAuthentication: boolean;
    featureDependency: any;
    parameters: {};

    constructor(
        name: string,
        permissionName: string,
        icon: string,
        route: string,
        routeErps?: string[],
        items?: AppMenuItem[],
        external?: boolean,
        parameters?: Object,
        featureDependency?: any,
        requiresAuthentication?: boolean
    ) {
        this.name = name;
        this.permissionName = permissionName;
        this.icon = icon;
        this.route = route;
        this.routeErps = routeErps;
        this.external = external;
        this.parameters = parameters;
        this.featureDependency = featureDependency;

        if (items === undefined) {
            this.items = [];
        } else {
            this.items = items;
        }

        if (this.permissionName) {
            this.requiresAuthentication = true;
        } else {
            this.requiresAuthentication = requiresAuthentication ? requiresAuthentication : false;
        }
    }

    hasFeatureDependency(): boolean {
        return this.featureDependency !== undefined;
    }

    featureDependencySatisfied(): boolean {
        if (this.featureDependency) {
            return this.featureDependency();
        }

        return false;
    }
}
