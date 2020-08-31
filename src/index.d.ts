declare namespace Ruhs {
  type Channel = undefined;

  interface User {
    id: string;
    username: string;
    discriminator: number;
    tag: string;
    getAvatar: (() => string);
  }

  interface Member {
    user: User;
    nick: string | undefined;
    roles: string[],
    joinedAt: Date | undefined;
    premiumSince: Date | undefined;
    deaf: boolean;
    mute: boolean;
  }

  type CollectionType<V> = ((collectionData: V[], key?: string) => {
    has: ((key: string) => boolean),
    get: ((key: string) => (V | undefined)),
    set: ((key: string, value: unknown) => void)
  });

  interface Guild {
    name: string;
    channels: ReturnType<CollectionType<Channel>>,
    members: ReturnType<CollectionType<Member>>
  }

  interface ClientOptions {
    ws?: {
      version?: number;
      encoding?: "json" | "etf",
      compress?: boolean
    }
  }


  const Collection: CollectionType<any>;
  const createClient: ((token: string, options: ClientOptions) => Promise<void>);
  const ping: number;
  const cache: ({
    guilds: ReturnType<CollectionType<Guild>>,
    channels: ReturnType<CollectionType<Channel>>
  });

  const eventHandlers: ({
    ready?: (() => unknown),
    guildCreate?: ((guild: Guild) => unknown),
    guildMemberAdd?: ((member: Member) => unknown)
  });
}

export = Ruhs;
