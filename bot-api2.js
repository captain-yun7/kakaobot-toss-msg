/**
 * 메신저봇R API2 버전 (0.7.34a+)
 * "디.저.트" 키워드가 포함된 메시지를 타겟방들로 전달
 *
 * 사용법:
 * 1. 타겟방에서 "!등록" 입력 → 타겟 목록에 추가 (여러 방 등록 가능)
 * 2. 타겟방에서 "!해제" 입력 → 타겟 목록에서 제거
 * 3. "!상태" 입력 → 등록된 타겟방 전체 확인
 * 4. 이후 디.저.트 포함 메시지 → 등록된 모든 타겟방으로 자동 전달
 */

var targetRooms = [];
var KEYWORD = "디.저.트";
var lastMsg = "";
var lastTime = 0;
var COOLDOWN = 3000;

var bot = BotManager.getCurrentBot();

bot.addListener(Event.MESSAGE, function(msg) {
    Log.d("[Dessert봇] 방: " + msg.room + " / 발신: " + msg.author + " / 내용: " + msg.content);

    // 타겟방 등록
    if (msg.content === "!등록") {
        if (targetRooms.indexOf(msg.room) !== -1) {
            msg.reply("이미 등록된 타겟방: " + msg.room);
            return;
        }
        targetRooms.push(msg.room);
        msg.reply("타겟방 등록 완료: " + msg.room + " (총 " + targetRooms.length + "개)");
        Log.d("[Dessert봇] 타겟방 등록: " + msg.room);
        return;
    }

    // 타겟방 해제
    if (msg.content === "!해제") {
        var idx = targetRooms.indexOf(msg.room);
        if (idx === -1) {
            msg.reply("등록되지 않은 방: " + msg.room);
            return;
        }
        targetRooms.splice(idx, 1);
        msg.reply("타겟방 해제 완료: " + msg.room + " (총 " + targetRooms.length + "개)");
        Log.d("[Dessert봇] 타겟방 해제: " + msg.room);
        return;
    }

    // 등록 상태 확인
    if (msg.content === "!상태") {
        if (targetRooms.length === 0) {
            msg.reply("등록된 타겟방 없음");
        } else {
            msg.reply("타겟방 (" + targetRooms.length + "개):\n" + targetRooms.join("\n"));
        }
        return;
    }

    // 중복 메시지 방지
    var now = new Date().getTime();
    if (msg.content === lastMsg && (now - lastTime) < COOLDOWN) {
        return;
    }

    // 키워드 매칭 → 모든 타겟방으로 전달 (타겟방 자체에서는 무시)
    if (targetRooms.length > 0 && msg.content.indexOf(KEYWORD) !== -1) {
        for (var i = 0; i < targetRooms.length; i++) {
            if (msg.room !== targetRooms[i]) {
                Log.d("[Dessert봇] 키워드 매칭 → 전달 시도 (" + targetRooms[i] + ")");
                bot.send(targetRooms[i], msg.content);
            }
        }
        lastMsg = msg.content;
        lastTime = now;
        Log.d("[Dessert봇] 전달 완료 (" + targetRooms.length + "개 방)");
    }
});
