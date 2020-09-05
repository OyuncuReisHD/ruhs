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
    guildID?: string;
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
    unavailable: boolean;
    members: ReturnType<CollectionType<Member>>;
    voiceStates: unknown; // voice state structure
    memberCount: number;
    channels: string[];
    presences: Presence[];
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
    channel: Channel;
    guild?: Guild;
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
    embeds: EmbedType[];
    reactions: unknown; // reaction structure
    nonce: number | string;
    pinned: boolean;
    type: MessageType;
  }

  interface Activity {
    name: string;
    type: PresenceTypes;
    url?: string | null;
    createdAt: Date;
    timestamps?: {
      start?: number;
      end?: number;
    };
    details?: string | null;
    state?: string | null;
    emoji?: Emoji | null;
    assets?: {
      largeImage: string | null;
      largeText: string | null;
      smallImage: string | null;
      smallText: string | null;
    }
  }

  interface Presence {
    roles: string[];
    game: Activity;
    guildID: string;
    status: PresenceStatuses;
    activities: Activity[];
    clientStatus: {
      desktop: boolean;
      mobile: boolean;
      web: boolean;
    };
    member: Member;
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

  interface EmbedType {
    title?: string;
    description?: string;
    url?: string;
    timestamp?: string;
    color?: number;
    footer?: EmbedFooter;
    image?: EmbedImage;
    thumbnail?: EmbedThumbnail;
    video?: EmbedVideo;
    author?: EmbedAuthor;
    fields: EmbedField[];
  }
  
  interface VoiceState {
    guild?: Guild;
    member?: Member;
    user?: User;
    sessionID: string;
    channelID: string;
    selfMute: boolean;
    selfDeaf: boolean;
    mute: boolean;
    deaf: boolean;
  }

  class Embed implements EmbedType {
    title?: string;
    description?: string;
    url?: string;
    timestamp?: string;
    color?: number;
    footer?: EmbedFooter;
    image?: EmbedImage;
    thumbnail?: EmbedThumbnail;
    video?: EmbedVideo;
    author?: EmbedAuthor;
    fields: EmbedField[];

    setURL: ((url: string) => Embed);
    setTitle: ((title: string) => Embed);
    setDescription: ((description: string) => Embed);
    addField: ((name: string, value: string, inline?: boolean) => Embed);
    setThumbnail: ((url: string) => Embed);
    setImage: ((url: string) => Embed);
    setTimestamp: ((timestamp: number) => Embed);
    setColor: ((color: number) => Embed);
    setAuthor: ((name: string, iconURL: string, url: string) => Embed);
    setFooter: ((text: string, iconURL: string) => Embed);
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
    has: ((key: string) => boolean);
    get: ((key: string) => V | undefined);
    set: ((key: string, value: unknown) => void);
    array: (() => V[] | undefined);
    keys: (() => string[]);
    entries: (() => [string, V | unknown][]);
    first: (() => V | unknown);
    last: (() => V | unknown);
    size: (() => number);
    map: ((callbackFn: ((value: V | unknown, index: number, array: (V | unknown)[]) => unknown)) => ReturnType<CollectionType<V | unknown>>);
    filter: ((callbackFn: ((value: V | unknown, index: number, array: (V | unknown)[]) => boolean)) => ReturnType<CollectionType<V | unknown>>);
    forEach: ((callbackFn: ((value: V | unknown, index: number, array: (V | unknown)[]) => void)) => Promise<void> | void);
  });

  type MessageContent = string | ({
    content?: string;
    embed?: EmbedType;
    tts?: boolean;
  });

  type PresenceTypes = "gaming" | "listening" | "streaming" | "custom";

  type PresenceStatuses = "online" | "dnd" | "idle" | "invisible" | "offline";

  type HTTPMethods = "GET" | "HEAD" | "POST" | "PUT" | "DELETE" | "CONNECT" | "OPTIONS" | "TRACE" | "PATCH";





  interface ClientOptions {
    ws?: ({
      version?: number;
      encoding?: "json" | "etf";
      compress?: boolean;
    });
    intents?: "ALL" | Intent[];
  }

  interface PresenceOptions {
    game?: {
      name: string;
      type: PresenceTypes;
      url?: string;
    };
    afk?: boolean;
    status?: PresenceStatuses;
  }




  const Collection: CollectionType<unknown>;
  const request: ((method: HTTPMethods, path: string, requestData?: object) => Promise<unknown>);


  const createClient: ((token: string, options?: ClientOptions) => Promise<void>);
  const deleteChannel: ((channelID: string) => Promise<void>)
  const deleteMessage: ((channelID: string, messageID: string) => Promise<void>);
  const editMessage: ((channelID: string, messageID: string, data: MessageContent) => Promise<Message>);
  // fetchAuditLogs
  const getPinnedMessages: ((channelID: string) => Promise<ReturnType<CollectionType<Channel>>>);
  const pinMessage: ((channelID: string, messageID: string) => Promise<void>);
  const sendMessage: ((channelID: string, data: MessageContent) => Promise<Message>);
  const setPresence: ((presence: PresenceOptions) => void);
  const unpinMessage: ((channelID: string, messageID: string) => Promise<void>);



  const cache: ({
    guilds: ReturnType<CollectionType<Guild>>,
    channels: ReturnType<CollectionType<Channel>>
  });

  const botInfo: ({
    id: string;
    token: string;
    pings: number[];
  });

  const eventHandlers: ({
    ready?: (() => Promise<void> | void);
    guildCreate?: ((guild: Guild) => Promise<void> | void);
    guildCache?: ((guild: Guild) => Promise<void> | void);
    guildMemberAdd?: ((member: Member, guild: Guild) => Promise<void> | void);
    guildMemberRemove?: ((member: Member, guild: Guild) => Promise<void> | void);
    voiceStateUpdate?: ((voiceState: VoiceState) => Promise<void> | void);
    messageCreate?: ((message: Message) => Promise<void> | void);
    messageUpdate?: ((message: Message) => Promise<void> | void);
    presenceUpdate?: ((presence: Presence) => Promise<void> | void);
    channelCreate?: ((channel: Channel) => Promise<void> | void);
    channelUpdate?: ((oldChannel: Channel, newChannel: Channel) => Promise<void> | void);
  });
}

export = Ruhs;
