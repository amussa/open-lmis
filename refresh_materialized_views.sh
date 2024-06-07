#!/bin/bash

psql -U postgres -d open_lmis -c "REFRESH MATERIALIZED VIEW public.vw_carry_start_dates;"
psql -U postgres -d open_lmis -c "REFRESH MATERIALIZED VIEW public.vw_stockouts;"
psql -U postgres -d open_lmis -c "REFRESH MATERIALIZED VIEW public.vw_daily_full_soh;"
psql -U postgres -d open_lmis -c "REFRESH MATERIALIZED VIEW public.vw_lot_expiry_dates;"
psql -U postgres -d open_lmis -c "REFRESH MATERIALIZED VIEW public.vw_period_movements;"
psql -U postgres -d open_lmis -c "REFRESH MATERIALIZED VIEW public.vw_weekly_nos_soh;"
psql -U postgres -d open_lmis -c "REFRESH MATERIALIZED VIEW public.vw_weekly_tracer_soh;"
psql -U postgres -d open_lmis -c "REFRESH MATERIALIZED VIEW public.vw_cmm_entries;"
psql -U postgres -d open_lmis -c "REFRESH MATERIALIZED VIEW public.vw_lot_expiry_dates;"
psql -U postgres -d open_lmis -c "REFRESH MATERIALIZED VIEW public.vw_lot_expiry_dates_facilityid_lotid;"

