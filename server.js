const HBInit = require("haxball-headless");

const room = HBInit({
  roomName: "Bigball || Zynn",
  maxPlayers: 16,
  public: true,
  noPlayer: true
});

room.setDefaultStadium("Big");
room.setScoreLimit(5);
room.setTimeLimit(0);

// Auto admin kalau admin habis
function updateAdmins() {
  const players = room.getPlayerList();
  if (players.length === 0) return;
  if (players.some(p => p.admin)) return;
  room.setPlayerAdmin(players[0].id, true);
}

room.onPlayerJoin = function () {
  updateAdmins();
};

room.onPlayerLeave = function () {
  updateAdmins();
};

// Command admin
room.onPlayerChat = function (player, message) {
  if (message === "/jadiadmincuy") {
    room.setPlayerAdmin(player.id, true);
    room.sendChat("✅ Admin diberikan ke " + player.name);
    return false;
  }
};
