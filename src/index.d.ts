declare namespace Ruhs {
  interface User {
    id: string;
    username: string;
    discriminator: number;
    tag: string;
    getAvatar: (() => string);
  }

  interface Emoji {
    id: string | null;
    name: string | null;
    roles?: string[];
    user?: User;
    requireColons?: boolean;
    managed?: boolean;
    animated?: boolean;
    available?: boolean;
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
    parentID: string | null;
  }

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
    roles: ReturnType<CollectionType<Role>>;
    emojis: ReturnType<CollectionType<Emoji>>;
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
    presences: unknown; // presence structure
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

  interface Message {
    id: string;
    channel: (() => Channel);
    guild?: (() => Guild);
    author: User;
    member: (() => Member | null);
    content: string;
    createdAt: Date;
    edited: boolean;
    editedAt?: Date;
    tts: boolean;
    mentionedEveryone: boolean;
    mentions: ReturnType<CollectionType<(Member | User)>>;
    rolesMentions: ReturnType<CollectionType<Role>>;
    channelMentions: ReturnType<CollectionType<Channel>>;
    attachments: unknown; // attachment structure
    embeds: Embed[];
    reactions: unknown; // reaction structure
    nonce: number | string;
    pinned: boolean;
    type: MessageType;
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






  type Intent =
    "GUILDS" | "GUILD_MEMBERS" | "GUILD_BANS" |
    "GUILD_EMOJIS" | "GUILD_INTEGRATIONS" | "GUILD_WEBHOOKS" |
    "GUILD_INVITES" | "GUILD_VOICE_STATES" | "GUILD_PRESENCES" |
    "GUILD_MESSAGES" | "GUILD_MESSAGE_REACTIONS" | "GUILD_MESSAGE_TYPING" |
    "DIRECT_MESSAGES" | "DIRECT_MESSAGE_REACTIONS" | "DIRECT_MESSAGE_TYPING";

  type MessageType =
    "DEFAULT" | "RECIPIENT_ADD" | "RECIPIENT_REMOVE" | "CALL" |
    "CHANNEL_NAME_CHANGE" | "CHANNEL_ICON_CHANGE" | "CHANNEL_PINNED_MESSAGE" |
    "GUILD_MEMBER_JOIN" | "USER_PREMIUM_GUILD_SUBSCRIPTION" | "USER_PREMIUM_GUILD_SUBSCRIPTION_TIER_1" |
    "USER_PREMIUM_GUILD_SUBSCRIPTION_TIER_2" | "USER_PREMIUM_GUILD_SUBSCRIPTION_TIER_3" |
    "USER_PREMIUM_GUILD_SUBSCRIPTION_TIER_3" | "CHANNEL_FOLLOW_ADD" | "GUILD_DISCOVERY_DISQUALIFIED" |
    "GUILD_DISCOVERY_REQUALIFIED";

  type CollectionType<V> = ((collectionData: V[], key?: string) => {
    has: ((key: string) => boolean),
    get: ((key: string) => (V | undefined)),
    set: ((key: string, value: unknown) => void)
  });

  type MessageContent = string | ({
    content?: string;
    embed?: Embed;
    tts?: boolean;
  });

  type PresenceTypes = "gaming" | "listening" | "streaming";
  type PresenceStatuses = "online" | "dnd" | "idle" | "invisible" | "offline";





  interface ClientOptions {
    ws?: ({
      version?: number;
      encoding?: "json" | "etf";
      compress?: boolean;
    });
    intents?: Intent[];
  }

  interface PresenceOptions {
    game?: {
      name: string;
      type: PresenceTypes,
      url?: string
    },
    afk?: boolean,
    status?: PresenceStatuses
  }




  const Collection: CollectionType<any>;

  const sendMessage: ((channelID: string, data: MessageContent) => Message);

  const setPresence = ((presence: PresenceOptions) => void);

  const createClient: ((token: string, options: ClientOptions) => Promise<void>);
  
  const cache: ({
    guilds: ReturnType<CollectionType<Guild>>,
    channels: ReturnType<CollectionType<Channel>>
  });

  const botInfo: ({
    id: string;
    token: string;
  });

  const eventHandlers: ({
    ready?: (() => unknown),
    guildCreate?: ((guild: Guild) => unknown),
    guildMemberAdd?: ((member: Member, guild: Guild) => unknown),
    messageCreate?: ((message: Message) => unknown)
  });
}

export = Ruhs;
