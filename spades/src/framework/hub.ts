import Projection from "./projection"

class CeremonySummary {

}

class AdminActions {
  getCeremonies(): CeremonySummary[] {
    return []
  }
}

export class Hub {

  private adminActions: AdminActions;

  private constructor(private hubId: string, private hubAdminKey: string) {
    this.adminActions = new AdminActions();
  }

  static createLocal(hubId: string, hubAdminKey: string): Hub {
    return new Hub(hubId, hubAdminKey)
  }

  createCeremony(): Projection {
    return {
      ceremonyId: '0000',
      handle: '0000',
    }
  }

  admin(hubAdminKey: string): AdminActions {
    if (hubAdminKey !== this.hubAdminKey) {
      throw new Error('Method not implemented.');
    }
    return this.adminActions
  }
}