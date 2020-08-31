declare namespace Ruhs {
  type Channel = undefined;

  interface Member {
    user: any;
    nick: string | undefined;
    roles: string[],
    joinedAt: Date | undefined;
    premiumSince: Date | undefined;
    deaf: boolean;
    mute: boolean;
  }

  interface Guild {
    name: string;
    channels: CType<Channel>,
    members: CType<Member>
  }

  type CType<V> = ReturnType<((collectionData: V[], key?: string) => {
    has: ((key: string) => boolean),
    get: ((key: string) => (V | undefined)),
    set: ((key: string, value: unknown) => void)
  })>;


  const Collection: ((collectionData: unknown[], key?: string) => CType<(typeof collectionData)[0]>);
  const createClient: ((token: string, options: any) => Promise<void>);
  const ping: number;
  const cache: ({
    guilds: CType<Guild>,
    channels: CType<Channel>
  });
}

export = Ruhs;
