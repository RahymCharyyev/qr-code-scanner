document.getElementById('scan-btn').addEventListener('click', () => {
  const qrReader = document.getElementById('qr-reader');
  qrReader.style.display = 'block'; // Показать элемент для камеры

  function onScanSuccess(decodedText) {
    // Помещаем данные из QR-кода в инпут
    document.getElementById('qr-data').value = decodedText;
    // Останавливаем сканирование после успешного считывания
    html5QrCode
      .stop()
      .then(() => {
        qrReader.style.display = 'none'; // Скрыть элемент для камеры
      })
      .catch((err) => {
        console.error('Не удалось остановить камеру', err);
      });
  }

  function onScanFailure(error) {
    console.warn(`Ошибка сканирования: ${error}`);
  }

  const html5QrCode = new Html5Qrcode('qr-reader');
  html5QrCode
    .start(
      { facingMode: 'environment' }, // Камера задняя
      {
        fps: 10, // Частота кадров
        qrbox: { width: 250, height: 250 }, // Размер области сканирования
      },
      onScanSuccess,
      onScanFailure
    )
    .catch((err) => {
      console.error('Ошибка инициализации QR-считывателя', err);
    });
});
