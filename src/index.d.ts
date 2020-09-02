declare namespace Ruhs {
  type Intent =
    "GUILDS" | "GUILD_MEMBERS" | "GUILD_BANS" |
    "GUILD_EMOJIS" | "GUILD_INTEGRATIONS" | "GUILD_WEBHOOKS" |
    "GUILD_INVITES" | "GUILD_VOICE_STATES" | "GUILD_PRESENCES" |
    "GUILD_MESSAGES" | "GUILD_MESSAGE_REACTIONS" | "GUILD_MESSAGE_TYPING" |
    "DIRECT_MESSAGES" | "DIRECT_MESSAGE_REACTIONS" | "DIRECT_MESSAGE_TYPING";

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
    ws?: ({
      version?: number;
      encoding?: "json" | "etf";
      compress?: boolean;
    });
    intents?: Intent[];
  }

  interface EmbedFooter {
    text: string;
    icon_url?: string;
    proxy_icon_url?: string;
  }

  interface EmbedImage {
    url?: string;
    proxy_url?: string;
    height?: number;
    width?: number;
  }

  interface EmbedThumbnail {
    url?: string;
    proxy_url?: string;
    height?: number;
    width?: number;
  }

  interface EmbedVideo {
    url?: string;
    height?: number;
    width?: number;
  }

  interface EmbedAuthor {
    name?: string;
    url?: string;
    icon_url?: string;
    proxy_icon_url?: string;
  }

  interface EmbedField {
    name: string;
    value: string;
    inline?: boolean;
  }

  interface Embed {
    title?: string;
    description?: string;
    url?: string;
    timestamp?: number;
    color?: number;
    footer?: EmbedFooter;
    image?: EmbedImage;
    thumbnail?: EmbedThumbnail;
    video?: EmbedVideo;
    author?: EmbedAuthor;
    fields: EmbedField[];
  }

  interface Message {
    id: string;
    channel_id: string;
    guild_id?: string;
    author: User;
    member: Member;
    content: string;
    timestamp: number;
    edited_timestamp?: number;
    tts: boolean;
    // mention_everyone, mentions, mention_roles, mention_channels
    // attachments
    embeds: Embed[];
    // reactions
    nonce: number | string;
    pinned: boolean;
    type: number;
  }

  type ContentData = string | {
    content?: string;
    embed?: Embed;
    tts?: boolean;
  };

  const sendMessage: ((channelID: string, data: ContentData) => Message);

  const Collection: CollectionType<any>;

  const createClient: ((token: string, options: ClientOptions) => Promise<void>);
  const cache: ({
    guilds: ReturnType<CollectionType<Guild>>,
    channels: ReturnType<CollectionType<Channel>>
  });

  const eventHandlers: ({
    ready?: (() => unknown),
    guildCreate?: ((guild: Guild) => unknown),
    guildMemberAdd?: ((member: Member, guild: Guild) => unknown),
    messageCreate?: ((message: Message) => unknown)
  });
}

export = Ruhs;
