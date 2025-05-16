use anchor_lang::prelude::*;
use anchor_spl::token::{self, Token, TokenAccount, Transfer, Mint};

pub mod instructions;
pub mod state;
pub mod errors;

use instructions::deposit::*;
use state::*;
use errors::*;


declare_id!("6Lzr4oHzM66xrM48EAm99gY9dVHpVaDnUTYpP8bupfYM");

#[program]
pub mod zyros_collateral_vault {
    use super::*;

    pub fn deposit_collateral(
    ctx: Context<DepositCollateral>,
    amount: u64,
) -> Result<()> {
    handle(ctx, amount)
}

}