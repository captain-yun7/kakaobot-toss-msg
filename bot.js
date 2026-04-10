/**
 * 메신저봇R 스크립트
 * 그룹방에서 "Dessert" 키워드가 포함된 메시지를 타겟방으로 전달
 * 방 이름이 발신자 이름으로 잡히는 이슈 대응: 타겟방 room 값을 등록해서 사용
 */

var targetRoom = null;
var KEYWORD = "Dessert";
var REGISTER_CMD = "!등록";
var lastMsg = "";
var lastTime = 0;
var COOLDOWN = 3000;

function response(room, msg, sender, isGroupChat, replier, imageDB, packageName) {
    Log.d("[Dessert봇] 방: " + room + " / 발신: " + sender + " / 그룹: " + isGroupChat + " / 내용: " + msg);

    // 타겟방 등록: 타겟방에서 "!등록" 입력하면 해당 room 값을 저장
    if (msg === REGISTER_CMD) {
        targetRoom = room;
        replier.reply("타겟방 등록 완료: " + room);
        Log.d("[Dessert봇] 타겟방 등록: " + room);
        return;
    }

    // 중복 메시지 방지 (3초 내 동일 메시지 무시)
    var now = new Date().getTime();
    if (msg === lastMsg && (now - lastTime) < COOLDOWN) {
        return;
    }

    // 키워드 매칭 → 타겟방으로 전달
    if (msg.indexOf(KEYWORD) !== -1) {
        if (targetRoom === null) {
            Log.d("[Dessert봇] 타겟방 미등록. 타겟방에서 '!등록' 먼저 입력 필요");
            return;
        }
        Log.d("[Dessert봇] 키워드 매칭 → 전달 시도 (" + targetRoom + ")");
        replier.reply(targetRoom, msg);
        lastMsg = msg;
        lastTime = now;
        Log.d("[Dessert봇] 전달 완료");
    }
}
