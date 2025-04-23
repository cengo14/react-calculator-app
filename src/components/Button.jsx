import React, { useContext } from "react";
import { CalcContext } from "./../context/CalcContext";

// Buton tipi (işlem türü) için stil sınıfı seçimi
const getStyleName = (btn) => {
  const className = {
    "=": "equals", // "=" işareti için özel stil
    "x": "opt", // Çarpma için stil
    "/": "opt", // Bölme için stil
    "+": "opt", // Toplama için stil
    "-": "opt", // Çıkarma için stil
  };
  return className[btn]; // Geriye ilgili butonun stilini döndürür
};

const Button = ({ btn }) => {
  // Global calc state'ine erişim sağlanır
  const { calc, setCalc } = useContext(CalcContext);

  // Virgül butonuna tıklanınca çalışacak fonksiyon
  const commaClick = () => {
    // Eğer sayının içinde nokta yoksa, virgül ekler
    setCalc({
      ...calc,
      num: !calc.num.toString().includes(".") ? calc.num + "." : calc.num,
    });
  };

  // C (clear) butonuna tıklanınca çalışacak fonksiyon
  const resetClick = () => {
    // Hesap makinesinin tüm değerlerini sıfırlar
    setCalc({
      sign: "", // İşlem işareti sıfırlanır
      num: 0, // Girilen sayı sıfırlanır
      res: 0, // Sonuç sıfırlanır
    });
  };

  // Bir rakam butonuna tıklanınca çalışacak fonksiyon
  const handleClickButton = () => {
    const numberString = btn.toString(); // Tıklanan butonu string'e çevir

    let numberValue;
    // Eğer num zaten 0 ve tıklanan buton 0 ise, yeni bir değer eklenmez
    if (numberString === "0" && calc.num === 0) {
      numberValue = 0;
    } else {
      // Aksi takdirde, mevcut num ile yeni tıklanan rakamı birleştirir
      numberValue = Number(calc.num + numberString);
    }

    // Yeni değeri state'e kaydeder
    setCalc({
      ...calc,
      num: numberValue,
    });
  };

  // İşlem butonlarına tıklanınca çalışacak fonksiyon
  const signClick = () => {
    // İşlem işaretini günceller, yeni sayıyı sıfırlar
    setCalc({
      ...calc,
      sign: btn, // Buton değeri (toplama, çıkarma, vb.) işaret olarak kaydedilir
      res: calc.num || calc.res, // Eğer res değeri yoksa num değerini kaydeder
      num: 0, // Yeni sayı girilene kadar 0 yapar
    });
  };

  // "=" butonuna tıklanınca çalışacak fonksiyon
  const equalsClick = () => {
    // Hem result (res) hem de num varsa işlemi yap
    if (calc.res && calc.num) {
      const math = (a, b, sign) => {
        // İşlem fonksiyonları
        const result = {
          "+": (a, b) => a + b, // Toplama
          "-": (a, b) => a - b, // Çıkarma
          "x": (a, b) => a * b, // Çarpma
          "/": (a, b) => a / b, // Bölme
        };
        // Seçilen işlemi çalıştırır ve sonucu döndürür
        return result[sign](a, b);
      };

      // Hesaplama işlemi sonrası sonucu ve diğer değerleri günceller
      setCalc({
        res: math(calc.res, calc.num, calc.sign), // Hesaplanan sonucu kaydeder
        num: 0, // Sonuç sonrası num'u sıfırlar
        sign: "", // İşlem işaretini sıfırlar
      });
    }
  };

  // "%" butonuna tıklanınca çalışacak fonksiyon (Yüzde hesaplama)
  const percentClick = () => {
    // Mevcut num değerini 100'e böler ve sonucu kaydeder
    setCalc({
      ...calc,
      num: calc.num / 100,
      res: calc.num / 100,
      sign: "",
    });
  };

  // "+/-" butonuna tıklanınca çalışacak fonksiyon (Pozitif/negatif dönüşümü)
  const invertClick = () => {
    // Sayıyı pozitiften negatife ya da negatiften pozitife çevirir
    setCalc({
      ...calc,
      num: calc.num ? calc.num * -1 : 0, // Eğer sayi varsa negatifini alır, yoksa 0 yapar
      res: calc.res ? calc.res * -1 : 0, // Aynı şekilde result'u da negatif yapar
      sign: "",
    });
  };

  // Butona tıklanınca hangi işlemin yapılacağını kontrol eder
  const handleBtnClick = () => {
    // Tıklanan butonları işlemlerle eşleştirir
    const result = {
      ".": commaClick, // Virgül butonuna basıldığında virgül ekler
      "C": resetClick, // C butonuna basıldığında resetle
      "/": signClick, // Bölme işlemi
      "x": signClick, // Çarpma işlemi
      "-": signClick, // Çıkarma işlemi
      "+": signClick, // Toplama işlemi
      "=": equalsClick, // Eşittir butonuna basıldığında sonucu hesapla
      "%": percentClick, // Yüzde hesaplama
      "+/-": invertClick, // Pozitif/negatif dönüşümü
    };
    // Eğer buton işlem listesinde varsa, o işlemi çalıştır
    if (result[btn]) {
      return result[btn]();
    } else {
      // Eğer sayı butonlarından biri tıklanmışsa, sayıyı ekle
      return handleClickButton();
    }
  };

  return (
    <button onClick={handleBtnClick} className={`${getStyleName(btn)} button`}>
      {btn} {/* Butonun etiketini göster */}
    </button>
  );
};

export default Button;
