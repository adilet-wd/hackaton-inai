import {useEffect, useState} from "react";
import "./Calculator.scss";
import {Button, Form, Modal} from "react-bootstrap";
import axios from "axios";



const bankData = [
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

interface Bank {
  id: number,
  name: string
      data: {
      description: string,
      website: string,
      logoUrl: string,
      loanOffers: (string | number)[][]
      }
}

const Calculator = () => {
  const [bankOptions, setBankOptions] = useState<Bank[]>(bankData);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  async function getBanks() {
    const response = await axios.get(`${import.meta.env.VITE_API_URL_BANK}/bank-api/banks`,{});
    return response.data;
  }
  useEffect(() => {
     getBanks().then((data)=> {
       setBankOptions(data);
    });
  }, []);


  const [dateValue, setDateValue] = useState(1); // initial value
  const [currency, setCurrency] = useState(""); // initial valuec
  const [radioVal, setRadioVal] = useState(Boolean); // initial value
  // const [loanVal, setLoanVal] = useState(0); // initial value
  const [bank, setBank] = useState(""); // initial valuec
  const [loanOff, setLoanOff] = useState<(string | number)[][]>([]); // initial valuecc
  const [bankLoanType, setBankLoanType] = useState(""); // initial valuecc
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [loanSum, setLoanSum] = useState();
  const [currentLoanRate, setCurrentLoanRate] = useState(0);
  const [monthActive, setMonthActive] = useState(false);
  const [yearActive, setYearActive] = useState(false);

  // const [selectedLoan, setSelectedLoan] = useState([]);

  const selectedLoan = loanOff.find((item) => item[0] === bankLoanType);

  const min = selectedLoan ? selectedLoan[radioVal ? 2 : 4] : 0; // loanoff[2] или loanoff[4] в зависимости от radioVal
  const max = selectedLoan ? selectedLoan[radioVal ? 3 : 5] : 0; // loanoff[3] или loanoff[5] в зависимости от radioVal

  const currencyOptions = [
    { value: "Сом", label: "Кыргызский сом" },
    { value: "Руб", label: "Русский руб" },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDateValue(Number(e.target.value));
    if (selectedLoan) {
      if(monthActive){
        console.log(`Первый высчет за месяц ${selectedLoan[1]} selectedLoan and ${dateValue} месяцев`);
        calculateLoan(loanSum, selectedLoan[1] as number, (dateValue)/12);
      } else {
        console.log(`${selectedLoan[1]} selectedLoan and ${dateValue} dateValue`);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        calculateLoan(loanSum, selectedLoan[1] as number, dateValue);
      }
    }
  };



  const handleLoanSumChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    setLoanSum(Number(e.target.value));
    if (selectedLoan) {
      if(monthActive){
        calculateLoan(Number(e.target.value), selectedLoan[1] as number, dateValue/12);
      } else {
        console.log(`${selectedLoan[1]} selectedLoan and ${dateValue} dateValue`);
            calculateLoan(Number(e.target.value), selectedLoan[1] as number, dateValue);
      }
    }
  };

  const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(currency);
    setCurrency(e.target.value);
  };
  const handleBankChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    bankOptions.map((item) => {
      if (item.name == e.target.value) {
        setLoanOff(item.data.loanOffers);
      }
    });
    setBank(e.target.value);
    setDateValue(1);
  };

  const handleBankLoanChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const loanType = e.target.value;
    setBankLoanType(loanType);
    setDateValue(1);

    const selected = loanOff.find((item) => item[0] === loanType);
    console.log(`${selected} selectedLoan`);

    if (selected) {
      setCurrentLoanRate(selected[1] as number);
      if (selected[3] == 0 && selected[5] !== 0) {
        setRadioVal(false);
        setMonthActive(false);
        setYearActive(true);
      } else if (selected[5] == 0 && selected[3] !== 0) {
        setRadioVal(true);
        setYearActive(false);
        setMonthActive(true);
      } else {
        setRadioVal(false);
        setMonthActive(false);
        setYearActive(true);
      }
    }
  };

  function calculateLoan(principal: number, annualRate: number, years: number) {
    console.log(`number: ${principal}, rate:${annualRate} and ${years} years`);

    const months = years * 12;
    const monthlyRate = annualRate / 100 / 12; // Convert annualRate to decimal
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

  useEffect(() => {
    if (!selectedLoan || loanSum === undefined || loanSum <= 0) return;

    const timer = setTimeout(() => {
      const rate = selectedLoan[1] as number;
      const duration = monthActive ? dateValue / 12 : dateValue;

      console.log("⏳ Debounced calculateLoan");
      calculateLoan(loanSum, rate, duration);
    }, 1000);

    return () => clearTimeout(timer); // очистка таймера при каждом изменении
  }, [loanSum, dateValue, selectedLoan, monthActive]);

  return (
    <div className="calcMain_block">
      <h1 className="text-uppercase calcMain_title">Рассчитайте свой кредит</h1>
      <div className="calcInfo_block">
        <div className="calcInfo_inputs">
          <Form >
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
                disabled={bank === ""}
              >
                <option>{bank==="" ? "Сначала выберите банк": "Нажмите, чтобы выбрать"}</option>
                {loanOff.map((item, index) => (
                        <option key={`${item[0]}-${item[1]}-${index}`} value={item[0]}>
                          {item[0]}
                        </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="amountmoney">
              <Form.Label>Укажите желаемую сумму</Form.Label>
              <Form.Control
                type="number"
                placeholder={bank==="" ? "Сначала выберите банк": "Выберите сумму"}
                className="bg-primary border-primary text-white calcInfo_input"
                value={loanSum}
                onChange={handleLoanSumChange}
                disabled={bank === ""}
              />
            </Form.Group>
            {(selectedLoan) ? <><Form.Group className="dates-block">
                      <Form.Label>Укажите срок кредита</Form.Label>
                      <div className="calcinfo_mini">
                        <div className="calcInfo_box">{dateValue}</div>
                        <div className="calcinfo_radios">
                          {!(selectedLoan) || selectedLoan[3] !== 0 ? (
                                  <div className="calcInfo_radio">
                                    <Form.Check
                                            type="radio"
                                            name="duration"
                                            id="month"
                                            checked={monthActive}
                                            onChange={() => {
                                              setRadioVal(true);
                                              setMonthActive(true);
                                              setYearActive(false);
                                              setDateValue(1);
                                            }}
                                    />
                                    <Form.Label htmlFor="month" className="calcml">
                                      Месяц
                                    </Form.Label>
                                  </div>
                          ) : null}
                          {!(selectedLoan) || selectedLoan[5] !== 0 ? (
                                  <div className="calcInfo_radio">
                                    <Form.Check
                                            type="radio"
                                            name="duration"
                                            id="year"
                                            checked={yearActive}
                                            onChange={() => {
                                              setRadioVal(false);
                                              setYearActive(true);
                                              setMonthActive(false);
                                              setDateValue(1);
                                            }}
                                    />
                                    <Form.Label htmlFor="year" className="calcml">
                                      Год
                                    </Form.Label>
                                  </div>
                          ) : null}
                        </div>
                      </div>
                      <Form.Range
                              min={min}
                              max={max}
                              value={dateValue}
                              onChange={handleChange}
                      />
                    </Form.Group>
                    <div className={"calcInfo_range"}>
                      <div>{min}</div>
                      <div>{max}</div>
                    </div> </>: null}

          </Form>
        </div>
        <div className="calcInfo_view">
          <div className="calcView_mini " id="viewMini2">
            <div className="calcView_text">
              <p>Сумма кредита</p>
              <h4>
                {loanSum === undefined ? 0 : loanSum} {currency.toLowerCase()}
              </h4>
            </div>
            <div className="calcView_text">
              <p>Процентная ставка</p>
              <h4>{currentLoanRate}%</h4>
            </div>
            {" "}
            <div className="calcView_text">
              <p>Общая сумма Выплат</p>
              <h4>{totalPayment.toFixed(2)}</h4>
            </div>
            <div className="calcView_text">
              <p>Общая сумма процентов</p>
              <h4>{totalInterest.toFixed(2)}</h4>
            </div>
          </div>
          <div className="division-line2"></div>
          <div className="calcView_mini " id="viewMini2">
            <div className="calcView_text">
              <p>Ежемесячный платеж</p>
              <h4>{monthlyPayment.toFixed(2)}</h4>
            </div>
            <p>*Расчет процентов носит справочный характер</p>
          </div>
        </div>
      </div>

      <>
        <Button variant="primary" className={"order__button"} onClick={handleShow}>
          Оформить кредит
        </Button>

        <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Оформить кредит</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            При согласии,мы передадим ваши данные банку-кредитору, который свяжется с вами в ближайшее время.
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Назад
            </Button>
            <Button variant="primary" onClick={handleClose}>Да</Button>
          </Modal.Footer>
        </Modal>
      </>
    </div>
  );
};

export default Calculator;
