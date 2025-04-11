import { useState } from "react";
import "./Calculator.scss";
import { Form } from "react-bootstrap";

const bankOptions = [
  {
    id: 1,
    name: "BakaiBank",
    data: {
      description:
        "Установите POS-терминал от Бакай Банка всего 1% по карточным операциям, а по операциям с QR — 0%! ... Время выгодных кредитов! В преддверии праздников ставки ",
      website: "https://bakai.kg/ru/",
      logoUrl:
        "https://bakai.kg/bbank/resize/400/1000000/assets/general_menu_metas/2025/1/16/general_menu_meta_DYtO7AJjMsFdKBFNUxy0.png",
      loanOffers: [
        ["Рассрочка", 0, 1, 3, 0, 0],
        ["ипотека", 17, 2, 3, 1, 4],
        ["Рассрочкаw", 22, 1, 3, 0, 0],
      ],
    },
  },
  {
    id: 2,
    name: "Mbank",
    data: {
      description:
        "Установите POS-терминал от Бакай Банка всего 1% по карточным операциям, а по операциям с QR — 0%! ... Время выгодных кредитов! В преддверии праздников ставки ",
      website: "https://bakai.kg/ru/",
      logoUrl:
        "https://bakai.kg/bbank/resize/400/1000000/assets/general_menu_metas/2025/1/16/general_menu_meta_DYtO7AJjMsFdKBFNUxy0.png",
      loanOffers: [
        ["Рассрочкаsdasdassda", 0, 1, 3, 0, 0],
        ["ипотека", 17, 2, 3, 1, 4],
      ],
    },
  },
  {
    id: 3,
    name: "Optima Bank",
    data: {
      description:
        "Установите POS-терминал от Бакай Банка всего 1% по карточным операциям, а по операциям с QR — 0%! ... Время выгодных кредитов! В преддверии праздников ставки ",
      website: "https://bakai.kg/ru/",
      logoUrl:
        "https://bakai.kg/bbank/resize/400/1000000/assets/general_menu_metas/2025/1/16/general_menu_meta_DYtO7AJjMsFdKBFNUxy0.png",
      loanOffers: [
        ["Рассрочкаda", 0, 1, 3, 0, 0],
        ["ипотека", 17, 2, 3, 1, 4],
      ],
    },
  },
];

const Calculator = () => {
  const [dateValue, setDateValue] = useState(0); // initial value
  const [currency, setCurrency] = useState(""); // initial valuec
  const [radioVal, setradioVal] = useState(Boolean); // initial value
  // const [loanVal, setLoanVal] = useState(0); // initial value
  const [bank, setBank] = useState(""); // initial valuec
  const [loanoff, setLoanoff] = useState<(string | number)[][]>([]); // initial valuecc
  const [bankLoanType, setBankLoanType] = useState(""); // initial valuecc
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [loanSum, setLoanSum] = useState(0);

  const selectedLoan = loanoff.find((item) => item[0] === bankLoanType);

  const min = selectedLoan ? selectedLoan[radioVal ? 2 : 4] : 0; // loanoff[2] или loanoff[4] в зависимости от radioVal
  const max = selectedLoan ? selectedLoan[radioVal ? 3 : 5] : 0; // loanoff[3] или loanoff[5] в зависимости от radioVal

  const currencyOptions = [
    { value: "Сом", label: "Кыргызский сом" },
    { value: "Руб", label: "Русский руб" },
    { value: "Доллар", label: "Американский доллар" },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDateValue(Number(e.target.value));
    console.log(dateValue);
  };

  const handleLoanSumChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoanSum(Number(e.target.value));
    calculateLoan(Number(e.target.value), 20, 3);
  };

  const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(currency);
    setCurrency(e.target.value);
  };
  const handleBankChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    bankOptions.map((item) => {
      if (item.name == e.target.value) {
        setLoanoff(item.data.loanOffers);
      }
    });
    setBank(e.target.value);
  };
  const handleBankLoanChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setBankLoanType(e.target.value);
  };

  function calculateLoan(principal: number, annualRate: number, years: number) {
    const months = years * 12;
    const monthlyRate = annualRate / 12;
    const monthlyPayment =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
      (Math.pow(1 + monthlyRate, months) - 1);
    const totalPayment = monthlyPayment * months;
    const totalInterest = totalPayment - principal;
    setTotalInterest(totalInterest);
    setTotalPayment(totalPayment);
    setMonthlyPayment(monthlyPayment);

    return { monthlyPayment, totalPayment, totalInterest };
  }

  return (
    <div className="calcMain_block">
      <h1 className="text-uppercase calcMain_title">Рассчитайте свой кредит</h1>
      <div className="calcInfo_block">
        <div className="calcInfo_inputs">
          <Form>
            <Form.Group className="mb-3 " controlId="Currency">
              <Form.Label>Выберите валюту</Form.Label>
              <Form.Select
                aria-label="Выберите валюту"
                className="bg-primary border-primary text-white"
                value={currency}
                onChange={handleCurrencyChange}
              >
                <option value="">Нажмите чтобы выбрать</option>
                {currencyOptions.map((currency) => (
                  <option key={currency.value} value={currency.value}>
                    {currency.label}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="typebank">
              <Form.Label>Выберите Банк</Form.Label>
              <Form.Select
                aria-label="Default select example"
                className="bg-primary border-primary text-white "
                value={bank}
                onChange={handleBankChange}
              >
                <option>Нажмите чтобы выбрать</option>
                {bankOptions.map((bank) => (
                  <option key={bank.id} value={bank.name}>
                    {bank.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="typeloan">
              <Form.Label>Выберите тип (тип кредита)</Form.Label>
              <Form.Select
                aria-label="Default select example"
                className="bg-primary border-primary text-white "
                value={bankLoanType}
                onChange={handleBankLoanChange}
              >
                <option>Нажмите чтобы выбрать</option>
                {loanoff.map((item) => (
                  <option key={item[1]} value={item[0]}>
                    {item[0]}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="amountmoney">
              <Form.Label>Укажите желаемую сумму</Form.Label>
              <Form.Control
                type="number"
                min={5000}
                placeholder="5000"
                className="bg-primary border-primary text-white calcInfo_input"
                value={loanSum}
                onChange={handleLoanSumChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Укажите срок кредита</Form.Label>
              <div className="calcinfo_mini">
                <div className="calcInfo_box">{dateValue}</div>
                <div className="calcinfo_radios">
                  <div className="calcInfo_radio">
                    <Form.Check
                      type="radio"
                      name="duration"
                      id="month"
                      checked={radioVal}
                      onChange={() => {
                        setradioVal(true);
                        setDateValue(1);
                      }}
                    />
                    <Form.Label htmlFor="month" className="calcml">
                      месяц
                    </Form.Label>
                  </div>
                  <div className="calcInfo_radio">
                    <Form.Check
                      type="radio"
                      name="duration"
                      id="year"
                      checked={!radioVal}
                      onChange={() => {
                        setradioVal(false);
                        setDateValue(1);
                      }}
                    />
                    <Form.Label htmlFor="year" className="calcml">
                      год
                    </Form.Label>
                  </div>
                </div>
              </div>
              <Form.Range
                min={min}
                max={max}
                value={dateValue}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </div>
        <div className="calcInfo_view">
          <div className="calcView_mini " id="viewMini2">
            <div className="calcView_text">
              <p>Сумма кредита</p>
              <h4>
                {loanSum} &nbsp;{currency.toLowerCase()}
              </h4>
            </div>
            <div className="calcView_text">
              <p>Процентная ставка</p>
              {loanoff.map((item) =>
                bankLoanType === item[0] ? (
                  <h4 key={item[0]}>{item[1]}</h4>
                ) : null
              )}
              {loanoff.every((item) => item[0] !== bankLoanType) && <h4>0</h4>}
            </div>{" "}
            <div className="calcView_text">
              <p>Общая сумма процентов</p>
              <h4>12 313.26 С</h4>
            </div>
          </div>
          <div className="division-line2"></div>
          <div className="calcView_mini " id="viewMini2">
            <div className="calcView_text">
              <p>Ежемесячный платеж</p>
              <h4>9 359.44 С</h4>
            </div>
            <p>*Расчет процентов носит справочный характер</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
