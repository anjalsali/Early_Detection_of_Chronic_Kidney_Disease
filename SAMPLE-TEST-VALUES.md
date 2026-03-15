# Sample test values

The model is trained on **`CKD_initial_dataset.csv`**. **P(CKD)** is the probability of the `ckd` class (`notckd` ≈ low %).

Use the form’s **Load sample inputs** or copy values below. After **`python backend/train_dnn.py`**, you should see:

- **Low risk:** &lt; 40%
- **Moderate risk:** 40–75%
- **High risk:** &gt; 75%

So: **notckd-like** → low %, **borderline / mild** → moderate %, **CKD-like** → high %.

---

## Test A — **High** risk (CKD patient, ~id 9 in initial dataset)

Typical severe markers: high urea/creatinine, low Hb/PCV, comorbidities.

| Field | Value |
|-------|--------|
| Age | 53 |
| Blood pressure | 90 |
| Specific gravity | 1.02 |
| Albumin | 2 |
| Sugar | 0 |
| Red blood cells (abnormal) | **Yes** |
| Pus cells (abnormal) | **Yes** |
| Pus cell clumps | **Yes** |
| Bacteria | No |
| Blood glucose random | 70 |
| Blood urea | **107** |
| Serum creatinine | **7.2** |
| Sodium | 114 |
| Potassium | 3.7 |
| Haemoglobin | **9.5** |
| Packed cell volume | **29** |
| White blood cell count | 12100 |
| Red blood cell count | 3.7 |
| Hypertension | Yes |
| Diabetes mellitus | Yes |
| Coronary artery disease | No |
| Poor appetite | Yes |
| Pedal edema | No |
| Anemia | Yes |

**Expected:** High likelihood of CKD, **high %** (e.g. **> 75%**).

---

## Test B — **Moderate** risk (~40–75%, target ~55–65%)

Mild / borderline markers: slightly low SG, mild anaemia, modest urea/creatinine.

| Field | Value |
|-------|--------|
| Age | 48 |
| Blood pressure | 82 |
| Specific gravity | 1.018 |
| Albumin | 1 |
| Sugar | 0 |
| Red blood cells (abnormal) | No |
| Pus cells (abnormal) | No |
| Pus cell clumps | No |
| Bacteria | No |
| Blood glucose random | 110 |
| Blood urea | 28 |
| Serum creatinine | 1.2 |
| Sodium | 137 |
| Potassium | 4.2 |
| Haemoglobin | 13.5 |
| Packed cell volume | 42 |
| White blood cell count | 8000 |
| Red blood cell count | 4.7 |
| Hypertension | No |
| Diabetes mellitus | No |
| Coronary artery disease | No |
| Poor appetite | No |
| Pedal edema | No |
| Anemia | No |

**Expected:** Moderate likelihood of CKD, **moderate %** (e.g. **~55–65%**).

---

## Test C — **Low** risk (healthy / notckd, ~end of initial dataset)

| Field | Value |
|-------|--------|
| Age | 69 |
| Blood pressure | 70 |
| Specific gravity | 1.02 |
| Albumin | 0 |
| Sugar | 0 |
| Red blood cells (abnormal) | No |
| Pus cells (abnormal) | No |
| Pus cell clumps | No |
| Bacteria | No |
| Blood glucose random | 83 |
| Blood urea | 42 |
| Serum creatinine | 1.2 |
| Sodium | 139 |
| Potassium | 3.7 |
| Haemoglobin | 16.2 |
| Packed cell volume | 50 |
| White blood cell count | 9300 |
| Red blood cell count | 5.4 |
| Hypertension | No |
| Diabetes mellitus | No |
| Coronary artery disease | No |
| Poor appetite | No |
| Pedal edema | No |
| Anemia | No |

**Expected:** Low likelihood of CKD, **low %** (e.g. **&lt; 40%**).

---

## Encoding (form ↔ API)

- **Yes** on binary / “abnormal” fields = **1**, **No** / normal = **0**  
- **Poor appetite** = **1**, good appetite = **0**  

If results look inverted, re-run **`python backend/train_dnn.py`** and restart the API so it loads the new `preprocessor.pkl` and `ckd_dnn.keras`.
