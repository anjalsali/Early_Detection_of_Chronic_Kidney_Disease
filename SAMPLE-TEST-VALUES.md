# Sample test values

Use these in the web form to check that the app behaves as expected.

---

## Test 1 — Expect **low** risk of CKD

| Field | Value |
|-------|--------|
| Age (years) | 48 |
| Blood pressure (mm/Hg) | 80 |
| Specific gravity | 1.02 |
| Albumin | 1 |
| Sugar | 0 |
| Blood glucose random (mg/dL) | 121 |
| Blood urea (mg/dL) | 36 |
| Serum creatinine (mg/dL) | 1.2 |
| Sodium (mEq/L) | 141 |
| Potassium (mEq/L) | 5 |
| Haemoglobin (g/dL) | 15.4 |
| Packed cell volume | 44 |
| White blood cell count | 7800 |
| Red blood cell count (millions/cmm) | 5.2 |
| Red blood cells (abnormal) | Yes |
| Pus cells (abnormal) | Yes |
| Pus cell clumps | No |
| Bacteria | No |
| Hypertension | Yes |
| Diabetes mellitus | Yes |
| Coronary artery disease | No |
| Poor appetite | No |
| Pedal edema | No |
| Anemia | No |

**Expected:** “Low likelihood of CKD” and **low** estimated risk of CKD (e.g. under 30%).

---

## Test 2 — Expect **high** risk of CKD

| Field | Value |
|-------|--------|
| Age (years) | 60 |
| Blood pressure (mm/Hg) | 70 |
| Specific gravity | 1.02 |
| Albumin | 0 |
| Sugar | 0 |
| Blood glucose random (mg/dL) | 94 |
| Blood urea (mg/dL) | 58 |
| Serum creatinine (mg/dL) | 0.6 |
| Sodium (mEq/L) | 147 |
| Potassium (mEq/L) | 5 |
| Haemoglobin (g/dL) | 16.4 |
| Packed cell volume | 43 |
| White blood cell count | 10800 |
| Red blood cell count (millions/cmm) | 5.7 |
| Red blood cells (abnormal) | Yes |
| Pus cells (abnormal) | Yes |
| Pus cell clumps | No |
| Bacteria | No |
| Hypertension | No |
| Diabetes mellitus | No |
| Coronary artery disease | No |
| Poor appetite | No |
| Pedal edema | No |
| Anemia | No |

**Expected:** “High likelihood of CKD” and **high** estimated risk of CKD (e.g. over 70%).

---

## Test 3 — Another low-risk example

| Field | Value |
|-------|--------|
| Age (years) | 40 |
| Blood pressure (mm/Hg) | 80 |
| Specific gravity | 1.025 |
| Albumin | 0 |
| Sugar | 0 |
| Blood glucose random (mg/dL) | 140 |
| Blood urea (mg/dL) | 10 |
| Serum creatinine (mg/dL) | 1.2 |
| Sodium (mEq/L) | 135 |
| Potassium (mEq/L) | 5 |
| Haemoglobin (g/dL) | 15 |
| Packed cell volume | 48 |
| White blood cell count | 10400 |
| Red blood cell count (millions/cmm) | 4.5 |
| Red blood cells (abnormal) | Yes |
| Pus cells (abnormal) | Yes |
| Pus cell clumps | No |
| Bacteria | No |
| Hypertension | No |
| Diabetes mellitus | No |
| Coronary artery disease | No |
| Poor appetite | No |
| Pedal edema | No |
| Anemia | No |

**Expected:** “Low likelihood of CKD” and low estimated risk (from dataset, this row is labeled no CKD).

---

Fill the form with one set of values, click **Check CKD risk**, then try another set. You should see the result and risk % change between Tests 1/3 (low) and Test 2 (high).
