declare namespace Ruhs {
  interface User {
    id: string;
    username: string;
    discriminator: number;
    tag: string;
    getAvatar: (() => string);
  }

  interface Role {
    id: string;
    name: string;
    color: number;
    hoist: boolean;
    position: number;
    permissions: unknown;
    managed: boolean;
    mentionable: boolean;
  }

  interface Member {
    id: string;
    user: User;
    nick: string | null;
    roles: string[],
    joinedAt: Date;
    premiumSince?: Date;
    deaf: boolean;
    mute: boolean;
  }

  interface Channel {
    id: string;
    type: "text" | "dm" | "voice" | "group_dm" | "category" | "news" | "guild_store";
    position?: number;
    positionOverwrites?: unknown;
    name?: string;
    topic?: string;
    nsfw?: boolean;
    bitrate?: boolean;
    userLimit?: number;
    rateLimitPerUser?: number;
    recipients?: User[];
    icon?: string | null; // hash
    ownerID?: string;
    parentID: string | null;
  }

  type CollectionType<V> = ((collectionData: V[], key?: string) => {
    has: ((key: string) => boolean),
    get: ((key: string) => (V | undefined)),
    set: ((key: string, value: unknown) => void)
  });

  interface Guild {
    id: string;
    name: string;
    getIcon: (() => string | null);
    getSplash: (() => string | null);
    getDiscoverySplash: (() => string | null);
    owner: Member;
    // permissions
    region: string;
    afkChannelID?: string;
    afkTimeout: number;
    verificationLevel: number;
    defaultMessageNotifications: number;
    explicitContentFilter: number;
    roles: Role[];
    emojis: unknown; // emoji structure
    features: unknown; // feature structure
    mfaLevel: number;
    widgetEnabled: boolean;
    widgetChannelID?: string;
    systemChannelID: string;
    // system_channel_flags
    rulesChannelID?: string;
    joinedAt: Date;
    large: boolean;
    members: ReturnType<CollectionType<Member>>;
    voiceStates: unknown; // voice state structure
    memberCount: number;
    channels: string[];
    presences: unknown; // presences structure
    maxPresences?: number;
    maxMembers?: number;
    vanityCode?: string;
    description?: string;
    getBanner: (() => string | null);
    premiumTier: number;
    premiumSubscriptionCount?: number;
    preferredLocale: string;
    publicUpdatesChannelID?: string;
    maxVideoChannelUsers?: number;
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
    guildMemberAdd?: ((member: Member, guild: Guild) => unknown)
  });
}

export = Ruhs;
