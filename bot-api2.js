/**
 * 메신저봇R API2 버전 (0.7.34a+)
 * "Dessert" 키워드가 포함된 메시지를 타겟방으로 전달
 *
 * 사용법:
 * 1. 타겟방(문섭팀)에서 "!등록" 입력 → 타겟방 등록
 * 2. "!상태" 입력 → 등록 상태 확인
 * 3. 이후 Dessert 포함 메시지 → 타겟방으로 자동 전달
 */

var targetRoom = null;
var KEYWORD = "디.저.트";
var lastMsg = "";
var lastTime = 0;
var COOLDOWN = 3000;

var bot = BotManager.getCurrentBot();

bot.addListener(Event.MESSAGE, function(msg) {
    Log.d("[Dessert봇] 방: " + msg.room + " / 발신: " + msg.author + " / 내용: " + msg.content);

    // 타겟방 등록
    if (msg.content === "!등록") {
        targetRoom = msg.room;
        msg.reply("타겟방 등록 완료: " + msg.room);
        Log.d("[Dessert봇] 타겟방 등록: " + msg.room);
        return;
    }

    // 등록 상태 확인
    if (msg.content === "!상태") {
        msg.reply("타겟방: " + (targetRoom || "미등록"));
        return;
    }

    // 중복 메시지 방지
    var now = new Date().getTime();
    if (msg.content === lastMsg && (now - lastTime) < COOLDOWN) {
        return;
    }

    // 키워드 매칭 → 타겟방으로 전달 (타겟방 자체에서는 무시)
    if (targetRoom !== null
        && msg.room !== targetRoom
        && msg.content.indexOf(KEYWORD) !== -1) {
        Log.d("[Dessert봇] 키워드 매칭 → 전달 시도 (" + targetRoom + ")");
        bot.send(targetRoom, msg.content);
        lastMsg = msg.content;
        lastTime = now;
        Log.d("[Dessert봇] 전달 완료");
    }
});
