# Stake Monthly Bonus: Exclusive perks for VIP users

**Stake monthly bonus** is a recurring cashback-style reward paid to active VIP players once per month, calculated from recent wagering activity, VIP tier, net profit/loss, and the house edge of the games played. It is separate from the weekly bonus, from rakeback, and from the welcome deposit match — and each of those has different eligibility rules and different expiry windows.

This page explains the calculation inputs, the VIP tier thresholds, the two delivery formats (reload vs coupon), the exact expiration rules, and how to estimate your own bonus with a working Python model. It contains no affiliate links and no promotional codes.

---

## 📌 What the Stake Monthly Bonus Is

The monthly bonus is a **loyalty rebate**, not a sweepstakes prize. It is funded by the margin the operator already earned from your play, and it is sized to keep high-volume players active. The practical definition:

| Property | Detail |
|---|---|
| Frequency | Once per month (typically around the 15th, but variable) |
| Delivery | Email — private link or reload tab |
| Wagering requirement | **Typically none** on the bonus itself |
| Eligibility | Active VIP players, verified email, marketing emails enabled |
| Claim method | Manual (coupon link or reload tab) |
| Expiry | Coupon: up to ~3 months. Reload: ~5 days |

Two details trip people up. First, the bonus is **not** sent on a fixed calendar date — it varies month to month, so "the 15th" is a rough expectation, not a guarantee. Second, if you unsubscribed from marketing emails or your email bounces, you are disqualified even if your wagering qualifies.

---

## ⚙ The Calculation Inputs

The formula is not published. What is observable is that four inputs drive the result, and they are **multiplied and added together**, not treated equally:

| Input | Weight | What it does |
|---|---|---|
| **Total wager** in the period | Highest | The primary driver — sets the base |
| **VIP level** | Very high | A multiplier applied to the base |
| **Net profit/loss** | Medium | Net losses increase the cashback component |
| **Activity consistency** | Medium | Rewards spreading play across the full month |

The window is typically **7 to 42 days**, depending on the account and the period being evaluated.

A commonly cited structural model is:

```
monthly_bonus = (base_wager_factor × VIP_multiplier)
              + loss_cashback_component
              + consistency_bonus
```

**Why the loss component matters:** if you had a net-losing month, the operator may compensate with a slightly higher bonus. Games with a *higher* house edge may also yield a higher bonus percentage than low-edge games — because the margin generated was larger. This is the opposite of what most players assume.

### Why "just wager more" is incomplete advice

Wagering more raises the base, but it also raises expected loss. The honest framing is:

```
Net value of monthly bonus ≈ Bonus received − (Wager required × House edge)
```

If the bonus is smaller than the expected loss embedded in the wagering that generated it, the bonus is a partial rebate, not a gain. Chasing a tier to increase the multiplier is usually negative-EV: the volume required to reach the next tier typically costs more in expected loss than the incremental bonus returns.

---

## 💎 VIP Tiers and Thresholds

Stake runs a **15-tier** VIP ladder. The published anchors are cumulative wagering thresholds:

| Tier | Cumulative wager to reach |
|---|---|
| **Bronze** | $10,000 |
| **Silver** | $50,000 |
| **Gold** | $100,000 |
| **Platinum I–VI** | from $250,000 upward |
| **Diamond I–V** | substantially higher |
| **Obsidian** | ~$1,000,000,000 (top tier) |

### What unlocks at each stage

- **Bronze and up:** weekly bonuses, monthly bonuses, level-up bonuses, and rakeback.
- **Silver and up:** bonuses scale up.
- **Platinum and up:** daily bonuses begin.
- **Diamond and up:** custom benefits and VIP host access.

### Rakeback is not the monthly bonus

These are frequently confused. Rakeback is a **continuous** credit, while the monthly bonus is a **discrete** monthly payment.

| Reward | Trigger | Timing | Wagering req. |
|---|---|---|---|
| **Rakeback** | Every eligible wager | Builds continuously; collect anytime | None — withdrawable immediately |
| **Weekly bonus** | Activity in prior 7 days | Every Saturday, via VIP Telegram channel | Typically none |
| **Monthly bonus** | Activity over 7–42 days | Once monthly, by email | Typically none |
| **Welcome match** | First deposit | At deposit | **40× on bonus + deposit** |

**Important nuance on rakeback:** Stake's base rate is widely quoted as **3.5%**, but sources disagree on the base — some describe it as 3.5% of *house edge* at every rank, others as 3.5% of *total wagers* from the first bet. On a 96% RTP slot, 3.5% of total wagers equals 87.5% of house edge — a dramatically different number. Treat the base rate as account-specific and verify in your own VIP panel before modelling it.

---

## 📬 Delivery Formats: Reload vs Coupon

The monthly bonus arrives in one of two formats, and **you receive only one, not both**.

### 🔹 Reload
The bonus is split into multiple smaller claims — daily, hourly, or as often as every ten minutes — that must be manually claimed from the **Reloads** tab in the VIP section.

- Typically assigned to **lower-tier active players**.
- **Expiry: ~5 days.** Unclaimed installments disappear.

### 🔹 Coupon
A one-time link delivered by email that grants the full bonus upfront.

- Typically assigned to **higher VIP tiers**, though exceptions exist.
- **Expiry: up to ~3 months** for the coupon itself.

**The operational takeaway:** if you receive reloads, the clock is five days, not three months. Missing them is the single most common way players forfeit a bonus they already earned.

---

## 🐍 Python Estimator (Relative Model)

Because the true formula is private, any estimator is a **relative model** — useful for comparing your own months and tiers, not for predicting an exact payout. The weights below mirror publicly observed behaviour: wager as base, tier as multiplier, losses as an additive cashback, consistency as a bounded multiplier.

```python
VIP_MULTIPLIERS = {
    "bronze": 0.005, "silver": 0.008, "gold": 0.012,
    "platinum": 0.018, "diamond": 0.025, "obsidian": 0.040,
}
LOSS_CASHBACK_RATE = 0.10   # illustrative: 10% of net loss
BASE_CONSISTENCY    = 0.8   # floor multiplier
CONSISTENCY_SPAN    = 0.4   # up to +0.4 at full-month activity

def estimate_monthly_bonus(total_wager, vip_tier, net_result, active_days, days_in_month=30):
    """
    Relative estimate of a Stake monthly bonus.
    net_result: positive = profit, negative = loss.
    Returns a breakdown, not a prediction of Stake's actual figure.
    """
    tier = vip_tier.lower()
    if tier not in VIP_MULTIPLIERS:
        raise ValueError(f"Unknown tier '{vip_tier}'. Valid: {list(VIP_MULTIPLIERS)}")

    base_bonus   = total_wager * VIP_MULTIPLIERS[tier]
    loss_cashback = abs(net_result) * LOSS_CASHBACK_RATE if net_result < 0 else 0.0

    ratio = min(active_days / days_in_month, 1.0)
    consistency_multiplier = BASE_CONSISTENCY + (CONSISTENCY_SPAN * ratio)  # 0.8x–1.2x

    total = (base_bonus + loss_cashback) * consistency_multiplier
    return {
        "tier": tier,
        "base_bonus": round(base_bonus, 2),
        "loss_cashback": round(loss_cashback, 2),
        "consistency_ratio": f"{ratio * 100:.1f}%",
        "consistency_multiplier": f"{consistency_multiplier:.2f}x",
        "estimated_bonus": round(total, 2),
    }

def net_value(bonus, wager, house_edge=0.03):
    """Bonus minus the expected loss on the wagering that generated it."""
    return round(bonus - (wager * house_edge), 2)

# --- Examples ---
print(estimate_monthly_bonus(5000, "bronze", -200, 12))
# base 25.0, loss cashback 20.0, consistency ~0.96x → ~43.2

print(estimate_monthly_bonus(50000, "gold", -1000, 26))
# base 600.0, loss cashback 100.0, consistency ~1.15x → ~805.0

print(net_value(43.2, 5000, 0.03))   # -106.8 → bonus does not cover expected loss
print(net_value(805.0, 50000, 0.03)) # -695.0 → same conclusion at higher volume
```

**How to read the output:** `net_value` is the number that matters. A large `estimated_bonus` on high volume frequently produces a negative `net_value`, because the expected loss on the qualifying wagering exceeds the rebate. The bonus reduces the cost of play; it does not create profit.

---

## ✅ Pre-Claim Checklist

Before counting on a monthly bonus:

- [ ] **Is your email verified and are marketing emails enabled?** Unsubscribed or bouncing addresses are disqualified.
- [ ] **Is your account in good standing?** Any violation removes eligibility.
- [ ] **Did you actually receive the email?** No email means you did not qualify that month — it is not a delivery delay.
- [ ] **Which format did you get — reload or coupon?** This determines your deadline.
- [ ] **If reload: have you claimed every installment within 5 days?**
- [ ] **If coupon: is the link still inside its validity window?**
- [ ] **Does the bonus carry any wagering requirement?** Usually none, but confirm on the specific offer.
- [ ] **Have you checked spam?** Monthly bonus emails routinely land there.

---

## 🚫 Common Myths

| Myth | Reality |
|---|---|
| "The monthly bonus arrives on a fixed date" | It is variable, typically around the 15th but not guaranteed |
| "No email just means it's delayed" | No email generally means you were not eligible that month |
| "Monthly and weekly bonuses are the same thing" | Weekly is paid Saturdays; monthly is a separate, larger-window calculation |
| "Rakeback and the monthly bonus are the same reward" | Rakeback builds per wager and is instantly withdrawable; monthly is discrete and email-delivered |
| "A higher tier guarantees a bigger monthly bonus" | Tier is a multiplier on *current* activity; a dormant high tier can receive less than an active lower tier |
| "Reloads and coupons have the same expiry" | Reload ≈ 5 days; coupon ≈ up to 3 months |
| "You can receive a reload and a coupon in the same month" | You receive exactly one format |
| "Wagering more always means a better net outcome" | Higher wager raises the bonus and the expected loss; net value can fall |

---

## ❓ FAQ

**What is the Stake monthly bonus?**
A recurring monthly loyalty reward for active VIP players, calculated from recent wagering, VIP level, net profit/loss, and game house edge.

**How is it calculated?**
Stake does not publish the formula. Observable inputs are total wager over a 7–42 day window, VIP tier multiplier, a loss-cashback component, and an activity-consistency factor.

**When does it arrive?**
Generally around the 15th of the month, but the date varies and is not fixed. It is delivered by email.

**Does it have a wagering requirement?**
Typically no — the bonus funds are usually usable immediately. Always confirm on the specific offer.

**Why didn't I receive one?**
Most common causes: unsubscribed from marketing emails, unverified or bouncing email, account not in good standing, or insufficient recent activity.

**What is the difference between reload and coupon?**
Reload splits the bonus into smaller installments claimed from the VIP Reloads tab (≈5-day expiry). Coupon is a single email link granting the full amount (≈3-month validity).

**Can I get a bigger bonus next month?**
Higher wager and higher tier increase the estimate — but compute the net value first. The additional expected loss from the volume needed to climb a tier frequently exceeds the incremental bonus.

**Is the monthly bonus the same as rakeback?**
No. Rakeback accrues per wager and is withdrawable immediately; the monthly bonus is a separate, once-per-month calculation.

**Does Stake.us work the same way?**
Stake.us uses Gold Coins and Stake Cash rather than real-money crypto, but the monthly bonus concept and VIP-tier dependence are structurally similar, with a no-deposit monthly allocation for eligible players.

---

## ⚠️ Responsible Participation

Monthly bonuses are a retention mechanism. Their function is to make continued play feel rewarded — which means the structure is designed to increase wagering frequency, not to improve your net position.

- Set a hard budget before playing and treat it as spent.
- Never increase wagering solely to raise a monthly bonus. Compute `net_value` first; it is usually negative.
- Eligibility and tier thresholds create a treadmill: each month's baseline becomes next month's requirement.
- Rakeback and bonuses reduce the house edge; they do not eliminate it. No promotion changes the underlying math of the games.
- If gambling is causing financial stress, relationship strain, or loss of control, stop and seek support.

**Free, confidential support:**
- **BeGambleAware** — begambleaware.org
- **Gamblers Anonymous** — gamblersanonymous.org
- **Gambling Therapy** — gamblingtherapy.org
- **US National Problem Gambling Helpline** — 1-800-522-4700 (24/7)

Laws vary by jurisdiction. Verify local legality before participating in any online platform.

---

## 📘 Educational Disclaimer

Provided strictly for educational and informational purposes. All figures are illustrative examples, not predictions or offers. The VIP multipliers and cashback rates in the Python model are approximations based on publicly observed behavior, not Stake's published formula — the actual amount is determined internally by Stake and shown in your account. No services, files, or financial guarantees are offered. This page contains no affiliate links or promotional codes. Verify local laws, read platform terms in full, and consult a qualified professional where appropriate before participating in any online platform ecosystem.
