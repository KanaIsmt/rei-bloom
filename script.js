// 仮想提案のストーリー（トップのスライドショー）
(function () {
  var items = [
    { no: '体験ギフト #01', tag: '初任給・母の日', title: 'いつもの場所で伝える、ありがとう',
      text: '一人暮らしで気づいた、お母さんのカレーのありがたさ。初任給の「ありがとう」を、帰省した日に母と一緒にカレーをつくる時間に。' },
    { no: '体験ギフト #02', tag: '父の日', title: 'あの頃、伝えられなかった想い',
      text: '何も言わずにキャッチボールに付き合ってくれた父へ。贈り物ではなく、父の好きな釣りに一緒に出かけて、その夜の晩酌でひとこと。' },
    { no: '体験ギフト #03', tag: '喜寿・傘寿のお祝い', title: 'いつもそばで、支えるために',
      text: 'いつも見守ってくれた祖父母の長寿のお祝いに。毎年の庭仕事を、今年は一緒に。「いつもありがとう、昔からずっと」。' }
  ];

  var slides = document.querySelectorAll('.carousel .slide');
  var tag = document.getElementById('carousel-tag');
  var no = document.getElementById('carousel-no');
  var title = document.getElementById('carousel-title');
  var text = document.getElementById('carousel-text');
  var dotsBox = document.getElementById('carousel-dots');
  var n = items.length;
  var current = 0;
  var timer = null;
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var dots = items.map(function (it, k) {
    var b = document.createElement('button');
    b.type = 'button';
    b.setAttribute('aria-label', it.no + 'を表示');
    b.addEventListener('click', function () { show(k); restart(); });
    dotsBox.appendChild(b);
    return b;
  });

  function show(k) {
    current = (k + n) % n;
    slides.forEach(function (s, i) {
      s.classList.toggle('is-active', i === current);
      s.setAttribute('aria-hidden', i === current ? 'false' : 'true');
    });
    dots.forEach(function (d, i) { d.classList.toggle('is-active', i === current); });
    tag.textContent = items[current].tag;
    no.textContent = items[current].no;
    title.textContent = items[current].title;
    text.textContent = items[current].text;
  }

  function start() { if (!reduce) { timer = setInterval(function () { show(current + 1); }, 5000); } }
  function restart() { clearInterval(timer); start(); }

  document.getElementById('carousel-prev').addEventListener('click', function () { show(current - 1); restart(); });
  document.getElementById('carousel-next').addEventListener('click', function () { show(current + 1); restart(); });

  show(0);
  start();
})();
