use anchor_lang::prelude::*;
use anchor_spl::token::{self, Transfer, Token, TokenAccount};

use crate::state::collateral_account::CollateralAccount;

#[derive(Accounts)]
#[instruction(amount: u64)]
pub struct DepositCollateral<'info> {
    #[account(mut)]
    pub user: Signer<'info>,

    #[account(mut)]
    pub user_token_account: Account<'info, TokenAccount>,

    #[account(mut)]
    pub vault_token_account: Account<'info, TokenAccount>,

    #[account(
        init_if_needed,
        seeds = [b"collateral", user.key().as_ref()],
        bump,
        payer = user,
        space = 8 + 8 // discriminator + amount: u64
    )]
    pub user_collateral: Account<'info, CollateralAccount>,

    pub token_program: Program<'info, Token>,
    pub system_program: Program<'info, System>,
    pub rent: Sysvar<'info, Rent>,
}

pub fn handle(ctx: Context<DepositCollateral>, amount: u64) -> Result<()> {
    let ix = Transfer {
        from: ctx.accounts.user_token_account.to_account_info(),
        to: ctx.accounts.vault_token_account.to_account_info(),
        authority: ctx.accounts.user.to_account_info(),
    };

    let cpi_ctx = CpiContext::new(ctx.accounts.token_program.to_account_info(), ix);
    token::transfer(cpi_ctx, amount)?;

    ctx.accounts.user_collateral.amount += amount;

    Ok(())
}
