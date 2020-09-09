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
    roles: Collection<Role>;
    emojis: Collection<Emoji>;
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
    members: Collection<Member>;
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
    game: Activity;
    status: PresenceStatuses;
    activities: Activity[];
    clientStatus: {
      desktop: boolean;
      mobile: boolean;
      web: boolean;
    };
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

  type WebhookContent = string | ({
    username?: string;
    avatarl_url?: string;
    content?: string;
    embeds?: EmbedType[];
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



  class Collection<K, V> extends Map<K, V> {
    constructor(data: V[], key?: string);
    has: ((key: string) => boolean);
    get: ((key: string) => V | undefined);
    set: ((key: string, value: unknown) => void);
    delete: ((key: string) => void);
    array: (() => V[] | undefined);
    keys: (() => string[]);
    entries: (() => [string, V | unknown][]);
    first: (() => V | unknown);
    last: (() => V | unknown);
    size: (() => number);
    map: ((callbackFn: ((value: V | unknown, key: string, index: number, array: (V | unknown)[]) => unknown)) => Collection<V | unknown>);
    filter: ((callbackFn: ((value: V | unknown, key: string, index: number, array: (V | unknown)[]) => boolean)) => Collection<V | unknown>);
    forEach: ((callbackFn: ((value: V | unknown, key: string, index: number, array: (V | unknown)[]) => void)) => Promise<void> | void);
  }

  const request: ((method: HTTPMethods, path: string, requestData?: object) => Promise<unknown>);


  /* <Channel> */
  /* <Channel> */

  interface ChannelData {
    name: string;
    type?: "text" | "voice" | "category";
    topic?: string;
    nsfw?: boolean;
    rateLimitPerUser?: number;
    bitrate?: number;
    userLimit?: number;
    position?: number;
    permissionOverwrites?: unknown; // permission overwrite structure
    parentID?: string;
  }

  interface Channel {
    id: string;
    type: "text" | "dm" | "voice" | "group_dm" | "category" | "news" | "guild_store";
    guildID?: string;
    position?: number;
    positionOverwrites?: unknown; // permission overwrite structure
    name?: string;
    topic?: string | null;
    nsfw?: boolean;
    lastMessageID?: string | null;
    bitrate?: boolean;
    userLimit?: number;
    rateLimitPerUser?: number;
    recipients?: User[];
    parentID?: string | null;
  }

  const createChannel: ((guildID: string, roleData: any) => Promise<Channel>);
  const deleteChannel: ((guildID: string, roleData: any) => Promise<void>);

  /* </Channel> */
  /* </Channel> */


  /* <Role> */
  /* <Role> */

  interface RoleData {
    name?: string;
    permissions?: unknown; // permissions
    color?: number;
    hoist?: boolean;
    mentionable?: boolean;
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

  const createRole: ((guildID: string, roleData: any) => Promise<Role>);
  const deleteRole: ((guildID: string, roleID: string) => Promise<Role>);

  /* </Role> */
  /* </Role> */


  /* <Reaction> */
  /* <Reaction> */

  interface Reaction {
    emoji?: Emoji;
    count: string;
    me: boolean;
  }

  const createReaction: ((channelID: string, messageID: string, emoji: string) => Promise<Reaction>);
  const deleteReaction: ((channelID: string, messageID, emoji: string, userID?: string) => Promise<void>);

  /* </Reaction> */
  /* </Reaction> */

  /* <Invite> */
  /* <Invite> */

  interface Invite {
    code: string;
    guild?: Guild;
    inviter?: User;
    channel: Channel;
    user: number;
    maxUses: number;
    temporary: boolean;
    createdAt: Date;
  }

  const getInvites: ((guildID: string) => Promise<Collection<Invite>>);

  /* </Invite> */
  /* </Invite> */

  /* <Message> */
  /* <Message> */

  type MessageType =
    "DEFAULT" | "RECIPIENT_ADD" | "RECIPIENT_REMOVE" | "CALL" |
    "CHANNEL_NAME_CHANGE" | "CHANNEL_ICON_CHANGE" | "CHANNEL_PINNED_MESSAGE" |
    "GUILD_MEMBER_JOIN" | "USER_PREMIUM_GUILD_SUBSCRIPTION" | "USER_PREMIUM_GUILD_SUBSCRIPTION_TIER_1" |
    "USER_PREMIUM_GUILD_SUBSCRIPTION_TIER_2" | "USER_PREMIUM_GUILD_SUBSCRIPTION_TIER_3" |
    "USER_PREMIUM_GUILD_SUBSCRIPTION_TIER_3" | "CHANNEL_FOLLOW_ADD" | "GUILD_DISCOVERY_DISQUALIFIED" |
    "GUILD_DISCOVERY_REQUALIFIED";

  type MessageContent = string | ({
    content?: string;
    embed?: EmbedType;
    tts?: boolean;
  });

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
    mentions?: Collection<(Member | User)>;
    rolesMentions?: Collection<Role>;
    channelMentions?: Collection<Channel>;
    attachments: unknown; // attachment structure
    embeds: EmbedType[];
    reactions: Reaction[];
    nonce: number | string;
    pinned: boolean;
    type: MessageType;
  }

  const deleteMessage: ((channelID: string, messageID: string) => Promise<void>);
  const editMessage: ((channelID: string, messageID: string, data: MessageContent) => Promise<Message>);
  const sendMessage: ((channelID: string, data: MessageContent) => Promise<Message>);
  const getPinnedMessages: ((channelID: string) => Promise<Collection<Channel>>);
  const pinMessage: ((channelID: string, messageID: string) => Promise<void>);
  const unpinMessage: ((channelID: string, messageID: string) => Promise<void>);

  const createClient: ((token: string, options?: ClientOptions) => Promise<void>);
  // fetchAuditLogs
  const setPresence: ((presence: PresenceOptions) => void);

  const addWebhook: ((channelID: string) => Promise<void>);
  const deleteWebhook: ((webhookID: string) => Promise<void>);
  const sendWithWebhook: ((webhookID: string, webhookToken: string, data: WebhookContent) => Promise<Message>);

  const cache: ({
    guilds: Collection<Guild>,
    channels: Collection<Channel>
  });

  const botInfo: ({
    id: string;
    token: string;
    ping: number;
    pings: number[];
  });

  const eventHandlers: ({
    ready?: (() => Promise<void> | void);

    guildCreate?: ((guild: Guild) => Promise<void> | void);
    guildCache?: ((guild: Guild) => Promise<void> | void);

    guildMemberAdd?: ((member: Member, guild: Guild) => Promise<void> | void);
    guildMemberRemove?: ((member: Member, guild: Guild) => Promise<void> | void);
    guildMemberUpdate?: ((oldMember: Member, newMember: Member, guild: Guild) => Promise<void> | void);
    kickMember?: ((member: Member, guild: Guild) => Promise<void> | void);
    banMember?: ((member: Member, guild: Guild) => Promise<void> | void);

    messageCreate?: ((message: Message) => Promise<void> | void);
    messageUpdate?: ((message: Message) => Promise<void> | void);

    presenceUpdate?: ((oldPresence: Presence, newPresence: Presence, user: User) => Promise<void> | void);
    voiceStateUpdate?: ((voiceState: VoiceState) => Promise<void> | void);

    channelCreate?: ((channel: Channel) => Promise<void> | void);
    channelUpdate?: ((oldChannel: Channel, newChannel: Channel) => Promise<void> | void);
    channelDelete?: ((channel: Channel) => Promise<void> | void);
  });
}

export = Ruhs;
