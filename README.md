# NephroSight

## Research Title

**Early Detection of Chronic Kidney Disease Using Machine Learning Techniques**

NephroSight is the practical implementation of this research. It translates the study findings into a usable full-stack web application that predicts CKD risk from clinical and demographic inputs.

---

## Abstract

Chronic Kidney Disease (CKD) is a major global health burden because early stages are often silent and difficult to diagnose in time. This project investigates whether machine learning can improve early CKD detection using a multivariate clinical dataset. Three algorithms were compared: Support Vector Machine (SVM), K-Nearest Neighbors (KNN), and Deep Neural Network (DNN).  

The comparative evaluation demonstrates that the DNN provides the best overall performance with **97.87% accuracy**, outperforming KNN (**79.2%**) and SVM (**61.6%**). Results are analysed using confusion matrices, precision, recall, F1-score, and AUC-ROC.  

The project also addresses ethical and practical constraints in healthcare AI and deploys the top-performing model in **NephroSight**, enabling research-aligned real-time CKD risk estimation for decision support.

**Keywords:** Chronic Kidney Disease (CKD), Support Vector Machine (SVM), K-Nearest Neighbors (KNN), Deep Neural Network (DNN)

---

## Table of Contents

1. Introduction  
2. Literature Review  
3. Methodology  
4. Results and Analysis  
5. Working Application: NephroSight  
6. Ethical, Legal, and Professional Considerations  
7. Conclusion  
8. Limitations and Future Work  
9. Reproducibility and Execution  
10. Repository Structure  

---

## 1. Introduction

CKD causes progressive loss of renal function and can lead to cardiovascular complications, anemia, bone disorders, and end-stage renal failure. The disease frequently progresses without obvious symptoms, which delays diagnosis and treatment. This delay has clinical, economic, and social consequences.

The central motivation of this project is that **earlier detection enables earlier intervention**, which can slow disease progression, reduce severe complications, and lower long-term treatment burden.

### 1.1 Problem Statement

Traditional diagnostic processes are clinically valuable but may miss subtle early-stage patterns. CKD diagnosis can be complicated by non-specific symptoms and overlapping comorbidities. This motivates development of data-driven methods that can identify complex nonlinear relationships across multiple patient attributes.

### 1.2 Aim

To implement and compare machine learning approaches for early CKD prediction and identify the most effective model for practical decision support.

### 1.3 Objectives

- Study CKD diagnostic challenges and existing ML evidence.
- Prepare and preprocess a CKD dataset with mixed feature types.
- Build and compare SVM, KNN, and DNN models.
- Evaluate with robust classification metrics.
- Translate research output into an operational application (NephroSight).

### 1.4 Research Questions

- **RQ1:** Can machine learning accurately predict CKD from clinical, laboratory, and demographic features?
- **RQ2:** How do SVM, KNN, and DNN compare on the same CKD dataset?
- **RQ3:** Can machine learning models provide better prediction support than traditional methods alone?

### 1.5 Hypothesis

- **H0:** Machine learning cannot accurately predict CKD from the selected feature set.
- **H1:** Machine learning can accurately predict CKD from the selected feature set.

---

## 2. Literature Review

Prior literature shows strong interest in machine learning for CKD detection, with multiple studies reporting high predictive performance from both classical and deep learning approaches. Existing work demonstrates:

- Strong performance from SVM, decision trees, and ensemble methods.
- Promising deep learning models for capturing nonlinear interactions.
- Continued reliance on relatively small CKD datasets (often 400 samples from UCI), which limits generalizability.

### 2.1 Research Gap

- Limited external validation across larger and diverse cohorts.
- Limited integration of high-performing models into complete clinical-style applications.
- Need for practical deployment workflows that preserve reproducibility and interpretability.

This project addresses that gap by combining comparative research and a deployable software pipeline.

---

## 3. Methodology

### 3.1 Dataset

- **Source:** UCI Machine Learning Repository (Chronic Kidney Disease dataset)
- **Total records:** 400
- **Features:** 24
- **Classes:** `ckd` (250), `notckd` (150)

The dataset includes continuous variables (for example blood urea, serum creatinine, hemoglobin, blood pressure) and categorical/binary variables (for example hypertension, diabetes mellitus, appetite, anemia).

### 3.2 Data Collection and Cleaning

Core cleaning steps:

- Removed non-informative `id` column.
- Standardized column names for readability and consistency.
- Converted categorical fields to numeric representations for ML compatibility.
- Addressed missing values through imputation strategy.

Outcome: a consistent, model-ready dataset with stable feature semantics.

### 3.3 Exploratory Data Analysis (EDA)

EDA was performed to understand feature distributions, class composition, and inter-feature correlations:

- Distribution plots for numerical attributes.
- Count plots for categorical attributes.
- Correlation heatmap for multicollinearity insights.

Observed relationships included strong positive and negative correlations between kidney-function and blood-profile attributes, which informed subsequent preprocessing and modeling choices.

### 3.4 Data Preprocessing

Preprocessing included:

- Missing value imputation.
- Categorical encoding into numeric form.
- Class imbalance handling in the research workflow via SMOTE.
- Feature scaling to normalize value ranges.

In the NephroSight implementation pipeline, training and inference use a persisted preprocessing artifact (`preprocessor.pkl`) to guarantee consistent transformations.

### 3.5 Machine Learning Models

Three model families were evaluated.

#### 3.5.1 Support Vector Machine (SVM)

SVM attempts to find an optimal separating hyperplane with maximal margin between classes. It showed moderate recall but weaker precision in this study.

#### 3.5.2 K-Nearest Neighbors (KNN)

KNN predicts labels by majority vote among nearest points in feature space (Euclidean-distance based neighborhood). It improved over SVM with stronger discrimination performance.

#### 3.5.3 Deep Neural Network (DNN)

A multi-layer dense neural model was trained for binary CKD classification. In this repository, the training pipeline (`backend/train_dnn.py`) uses:

- Dense layers: 128 -> 64 -> 32 -> 1 (logit output)
- Regularization: batch normalization + dropout
- Optimizer: Adam
- Loss: binary cross-entropy from logits
- Early stopping for generalization

For deployment interpretability, logits are converted to probability with temperature scaling.

### 3.6 Evaluation Metrics

Models were evaluated using:

- Accuracy
- Precision
- Recall
- F1-score
- AUC-ROC
- Confusion matrix (TP, TN, FP, FN analysis)

---

## 4. Results and Analysis

### 4.1 Comparative Performance Summary

- **DNN Accuracy:** 97.87%
- **KNN Accuracy:** 79.2%
- **SVM Accuracy:** 61.6%

The DNN substantially outperformed both classical baselines, indicating stronger capability to capture nonlinear interactions across heterogeneous CKD indicators.

### 4.2 SVM Results

- Accuracy: 61.6%
- Precision: 34.9%
- Recall: 75.9%
- F1-score: 47.9%
- AUC: 0.65

Interpretation: SVM captured many true CKD cases (higher recall) but generated many false positives (low precision), reducing overall reliability in this setting.

### 4.3 KNN Results

- Accuracy: 79.2%
- Precision: 71.0%
- Recall: 84.6%
- F1-score: 77.0%
- AUC: 0.91

Interpretation: KNN achieved significantly better balance than SVM and demonstrated good class separation capability.

### 4.4 DNN Results

- Accuracy: 97.87%
- Precision: 100%
- Recall: 100%
- F1-score: 100%
- AUC: 1.0

Interpretation: DNN achieved near-perfect discrimination on the evaluated set. Confusion matrix outcomes show complete or near-complete class separation in reported experiments, making DNN the strongest candidate for deployment.

### 4.5 Research Question Reflection

- **RQ1:** Supported. ML can accurately predict CKD from selected features.
- **RQ2:** Answered through comparative analysis; DNN > KNN > SVM in this project.
- **RQ3:** Results indicate ML-based support can outperform conventional standalone interpretation workflows for early classification.

Conclusion regarding hypothesis: findings support **H1**.

---

## 5. Working Application: NephroSight

NephroSight is the production-oriented implementation of the research findings, using the trained DNN model and a reproducible preprocessing pipeline.

### 5.1 System Architecture

- **Frontend:** Next.js + TypeScript
- **Backend:** FastAPI
- **Model layer:** TensorFlow/Keras DNN
- **Preprocessing artifact:** scikit-learn pipeline saved via Joblib

### 5.2 End-to-End Working Flow

1. User inputs 24 clinical and demographic parameters in the web form.
2. Frontend sends request to backend `/predict`.
3. Backend loads persisted preprocessing and model artifacts.
4. Input row is transformed with the exact training-compatible pipeline.
5. DNN predicts logit score.
6. Temperature scaling converts logit to calibrated probability.
7. API returns:
   - binary class prediction
   - CKD probability
8. UI renders risk percent and risk band with disclaimer.

### 5.3 Why This Matters Clinically

- Provides fast and consistent risk estimation.
- Enables early triage and proactive follow-up.
- Supports clinicians with quantitative signal, not replacement diagnosis.

### 5.4 Decision-Support Disclaimer

NephroSight is for **research and decision support only**. It is not a substitute for physician judgment, laboratory diagnosis, or specialist evaluation.

---

## 6. Ethical, Legal, Social, and Professional Considerations

- Patient data privacy and security are essential for deployment in healthcare settings.
- Model outputs must be used responsibly to avoid over-reliance.
- Bias, fairness, and transparency remain critical, especially with limited datasets.
- Clinical integration should include governance, auditability, and human oversight.

---

## 7. Conclusion

This project demonstrates that machine learning can significantly improve early CKD prediction, with DNN showing superior performance over SVM and KNN on the evaluated dataset. Beyond model comparison, the project contributes a working, reproducible full-stack system that operationalizes research outcomes for practical decision support.

The findings support the transformative role of machine learning in proactive CKD interventions and provide a strong foundation for future clinical translation.

---

## 8. Limitations and Future Work

### 8.1 Limitations

- Small dataset size (400 records) limits broad generalizability.
- Potential dataset bias due to single-source structured data.
- Class imbalance can affect model robustness.
- High-performing deep models can reduce interpretability without additional explainability layers.

### 8.2 Future Work

- Validate on larger, multi-center, and longitudinal datasets.
- Integrate additional modalities (wearables, lifestyle, genetics).
- Evaluate ensemble and hybrid architectures.
- Add explainability tooling for clinician trust (feature attribution, local explanations).
- Study real-time deployment in clinical workflows and EHR integration.

---

## 9. Reproducibility and Execution

### 9.1 Train Model

From project root:

```bash
python -m venv .venv
source .venv/Scripts/activate
pip install -r backend/requirements.txt
python backend/train_dnn.py
```

Generated artifacts:

- `backend/ml/preprocessor.pkl`
- `backend/ml/ckd_dnn.keras`

### 9.2 Run Backend

```bash
python -m uvicorn backend.app.main:app --reload --port 8001
```

- API: `http://127.0.0.1:8001`
- Docs: `http://127.0.0.1:8001/docs`

Optional environment variables to reduce TensorFlow logs:

```bash
export TF_CPP_MIN_LOG_LEVEL=2
export TF_ENABLE_ONEDNN_OPTS=0
```

### 9.3 Run Frontend

```bash
cd frontend
npm install
npm run dev
```

- App: `http://localhost:3000`

If backend is on a different port:

```env
NEXT_PUBLIC_CKD_API_URL=http://127.0.0.1:8001
```

---

## 10. Repository Structure

- `Research Materials/` - dataset and project/report artifacts
- `backend/train_dnn.py` - DNN training pipeline
- `backend/ml/` - feature pipeline and saved model/preprocessor artifacts
- `backend/app/` - FastAPI endpoints and inference logic
- `frontend/` - NephroSight user interface and visualization components

---

## Academic Details

**Project:** Early Detection of Chronic Kidney Disease Using Machine Learning Techniques  
**Author:** Anjal Sali  
**Program:** MSc Advanced Computer Science with Research  
**Institution:** University of Hertfordshire
