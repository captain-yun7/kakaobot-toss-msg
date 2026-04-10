# kakaobot-toss-msg — Bot

## 기술스택
- Python 3.11+
- 플랫폼: Kakao (토스 메시지 연동)
- 배포: TBD

## 아키텍처
- `src/` — 봇 로직
- `handlers/` — 메시지 핸들러
- `config/` — 설정

## 주요 규칙
- 웹훅 시크릿 검증 필수
- 사용자 입력 항상 sanitize
- 응답 타임아웃: 5초 이내
- 크리덴셜은 `.env` 참조, 절대 하드코딩 금지

## 작업 지시 경로
~/OneDrive/workspace/projects/kakaobot-toss-msg/worklogs/{날짜}/

## 자주 쓰는 커맨드
```bash
python main.py
python -m pytest tests/
```
